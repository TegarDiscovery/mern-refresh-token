const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Optional: handle disconnection
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Optional: handle errors
mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error);
});
