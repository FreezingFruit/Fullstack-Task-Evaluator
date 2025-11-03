import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const JWT_SECRET =
  process.env.JWT_SECRET || "incase-jwt-breaks-for-testing-only";

//DEBUGGING CONSOLE.LOG
console.log("Auth routes loaded successfully");
console.log("JWT_SECRET exists:", !!JWT_SECRET);

//REGISTER ENDPOINT
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    //CHECKS IF USER EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    //JWT TOKEN
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Register Successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//LOGIN ENDPOINT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    //CHECK PASSWORD
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //JWT TOKEN
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
