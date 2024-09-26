import axios from 'axios'

const instance = axios.create()

instance.interceptors.request.use(
    function(config) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function(res) {
        return res
    },
    async function(error){
        try {
            if(error.response.status === 401 && !error.config._refreshing){
                error.config._refreshing = true
                const res = await instance.post('http://localhost:3001/auth/refresh', {
                    refresh_token: localStorage.getItem('refresh_token')
                })

                localStorage.setItem('access_token',res.data.data.access_token)

                const apiRes = await instance(error.config)

                return apiRes
            }

            return Promise.reject(error)
        } catch {
            return Promise.reject(error)
        }
    }
)

export default instance