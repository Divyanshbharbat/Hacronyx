import mongoose from 'mongoose';

const checklistItemSchema = new mongoose.Schema({
  step: String,
  completed: { type: Boolean, default: false },
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  roadmap: [String],
  tasks: [String],
  taskProgress: [Boolean],  // used to calculate progress
  progressPercent: { type: Number, default: 0 },  // <-- add this
  checklist: [checklistItemSchema],
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const batchSchema = new mongoose.Schema({
  projects: [projectSchema],
  progressPercent: { type: Number, default: 0 }, // ✅ added to store batch progress
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  batches: [batchSchema],
  history: [String], // stores previously searched concepts
});

export default mongoose.model('User', userSchema);
