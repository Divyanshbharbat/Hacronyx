import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import router from './Router/router.js';
 // Ensure this exists
// If used elsewhere
 // This import isn't needed unless you're defining new routers

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/", router);

// ✅ Gemini function moved here:
const genAI = new GoogleGenerativeAI('AIzaSyC7JHcK8OuC4uXCugrtncSF_qdW3OiLykE');

async function generateProjectIdeas(concept, backgroundLevel, domain  = []) {
 
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Base prompt intro
const prompt = `
You are an expert educational AI assistant. A student with a "${backgroundLevel}" background wants to build projects based on the concept: "${concept}".

Generate 3 personalized, hands-on DIY project ideas across different domains such as coding, hardware, design, and research.

For each project, provide the following clearly numbered sections:
1. Project Title
2. Description
3. Tools/Materials needed (as a bulleted list)
4. Step-by-step build tasks, broken down into Beginner, Intermediate, and Advanced subtasks with clear bullet points
5. Roadmap: suggestions on how the student can evolve or scale this project over time

Format your response as a markdown list with each project starting with "**Project N:** <Project Name> (<Domain>)", followed by the numbered sections and content as markdown.

Begin your response with a short note about the assumed learner background and approach.

Make sure the tasks are beginner-friendly and scale complexity appropriately. Use clear indentation and bullet points so it can be parsed easily as an array of strings or markdown lines.
`;


  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response,"divyansh")
  return response.text();
}

import User from './User.js';
// ✅ POST endpoint
function parseMarkdownToTasks(markdown) {
  const fullText = Array.isArray(markdown) ? markdown.join('\n') : markdown;

  // Split projects by "**Project N:**" pattern
  const projects = fullText.split(/\*\*Project \d+:\*\*/).slice(1);

  return projects.map((proj, index) => {
    // Title extraction (1. **Project Title:** ...)
    const titleMatch = proj.match(/1\.\s*\*\*Project Title:\*\*\s*(.+)/);
    const title = titleMatch ? titleMatch[1].trim() : `Untitled Project ${index + 1}`;

    // Description extraction (2. **Description:** ... until next number or project start)
    // More flexible regex: allows optional bold, colon, newlines before next section number
    const descMatch = proj.match(/2\.\s*\*{0,2}Description:?\*{0,2}\s*([\s\S]*?)(?=\n\d+\.|\n\*\*Project|$)/i);
    const description = descMatch ? descMatch[1].trim() : 'No description provided.';

    // Roadmap extraction (5. **Roadmap:** list of bullet points)
    const roadmapMatch = proj.match(/5\.\s*\*\*Roadmap:\*\*\s*([\s\S]*?)(?=\n\d+\.|\n\*\*Project|$)/);
    let roadmap = [];
    if (roadmapMatch) {
      roadmap = roadmapMatch[1]
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('*'))
        .map(line => line.replace(/^\*\s*/, '').trim());
    }

    // Tasks extraction (4. **Tasks:** list of bullet points)
    const tasksSectionMatch = proj.match(/4\.\s*[\s\S]*?(?=\n\d+\.|\n\*\*Project|$)/);
    let tasks = [];
    if (tasksSectionMatch) {
      tasks = tasksSectionMatch[0]
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('*'))
        .map(line => line.replace(/^\*\s*/, '').trim());
    }

    return {
      title,
      description,
      roadmap,
      tasks,
      completed: false,
      createdAt: new Date()
    };
  });
}






app.post('/api/divyansh', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'divyansh');
    const username = decoded.username;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { concept, background, domain } = req.body;
    if (!concept || !background) {
      return res.status(400).json({ error: 'Concept and background are required' });
    }

    const markdown = await generateProjectIdeas(concept, background, domain);
    const projects = parseMarkdownToTasks(markdown);

    if (!user.batches) user.batches = [];

    user.batches.push({
      projects, // Array of projects in this batch
      createdAt: new Date(),
    });

    await user.save();

    res.json({
      message: "success",
      _id: user._id,
      batches: user.batches,
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

function groupTasksByLevel(tasks) {
  const grouped = {
    beginner: [],
    intermediate: [],
    advanced: [],
  };

  let currentLevel = null;

  tasks.forEach(line => {
    const lower = line.toLowerCase();
    if (lower.includes('beginner')) {
      currentLevel = 'beginner';
    } else if (lower.includes('intermediate')) {
      currentLevel = 'intermediate';
    } else if (lower.includes('advanced')) {
      currentLevel = 'advanced';
    } else if (currentLevel) {
      grouped[currentLevel].push(line);
    }
  });

  return grouped;
}

app.get('/api/tasks', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'divyansh');
    const username = decoded.username;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Calculate batch progress = (completed projects / total projects) * 100
    const batches = (user.batches || []).map(batch => {
      const totalProjects = batch.projects.length;
      const completedProjects = batch.projects.filter(p => p.completed).length;
      const progressPercent = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

      return {
        _id: batch._id,
        createdAt: batch.createdAt,
        progressPercent,
        projects: batch.projects,
      };
    });

    res.json({
      username: user.username,
      email: user.email,
      batches,
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/batches/:batchId/projects/:projectId/complete', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'divyansh');
    const username = decoded.username;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { batchId, projectId } = req.params;

    const batch = user.batches.id(batchId);
    if (!batch) return res.status(404).json({ error: 'Batch not found' });

    const project = batch.projects.id(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.completed = true;

    await user.save();

    res.json({ message: 'Project marked as complete', project });
  } catch (err) {
    console.error(err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ✅ MongoDB connection
mongoose.connect("mongodb://localhost:27017/hacronyx")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error", err));

// ✅ Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
