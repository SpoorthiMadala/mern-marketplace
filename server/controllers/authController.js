import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error during signin" });
  }
};
