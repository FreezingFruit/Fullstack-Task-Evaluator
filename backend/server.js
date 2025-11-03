import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const url = "mongodb://127.0.0.1:27017/task-manager";

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//API ROUTES
//TODO

//API HEALTH CHECK

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Task Api is running fine" });
});

//DATABASE SETUP
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connection successful");
  } catch (error) {
    console.log("Connection unsuccessful: ", error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
  });
};

startServer();
