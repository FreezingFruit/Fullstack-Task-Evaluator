import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

//REGISTER ENDPOINT
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    //CHECKS IF USER EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
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
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
