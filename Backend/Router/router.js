// backend/routes/authAndAI.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../User.js'


const router = express.Router();


// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ username });
    console.log(user)
    if (!user) return res.status(400).json({ error: "Invalid username or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid username or password" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET || "divyansh", { expiresIn: "1h" });
    res.json({ message: "success", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Generate Project Ideas with GPT


// User Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.send("success");
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;