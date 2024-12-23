import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000, // Waktu tunggu maksimum 5 detik
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  while (failedQueue.length) {
    const [resolve, reject] = failedQueue.shift();
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  }
};

instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push([resolve, reject]);
        })
          .then(() => instance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await instance.post("/auth/refresh", {
          refresh_token: localStorage.getItem("refresh_token"),
        });

        if (res.data && res.data.data && res.data.data.access_token) {
          localStorage.setItem("access_token", res.data.data.access_token);
          processQueue();
          return instance(originalRequest);
        } else {
          throw new Error("Invalid token response");
        }
      } catch (err) {
        processQueue(err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // Redirect ke halaman login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
