import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import User from '../User.js';
import auth from '../auth.js';
const router = express.Router();

// ---------------------------
// 🧠 User Signup
// ---------------------------
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

// ---------------------------
// 🔐 User Login
// ---------------------------
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid username or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid username or password" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET || "divyansh", { expiresIn: "24h" });

    res.json({ message: "success", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ---------------------------
// 📁 Multer Setup
// ---------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists!
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// ---------------------------
// 🔼 File Upload
// ---------------------------
router.post('/upload', upload.single('file'), (req, res) => {
  console.log("ipload")
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`,
  });
});

router.patch('/:userId/batch/:batchIndex/project/:projectIndex/checklist/:itemIndex', auth, async (req, res) => {
  const { userId, batchIndex, projectIndex, itemIndex } = req.params;
  const { completed } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const batch = user.batches[batchIndex];
    if (!batch) return res.status(404).json({ msg: 'Batch not found' });

    const project = batch.projects[projectIndex];
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    const checklistItem = project.checklist[itemIndex];
    if (!checklistItem) return res.status(404).json({ msg: 'Checklist item not found' });

    checklistItem.completed = completed;
    await user.save();

    res.json({ msg: 'Checklist item updated', checklist: project.checklist });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

export default router;
