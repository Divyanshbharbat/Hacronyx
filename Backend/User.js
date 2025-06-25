import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  roadmap: [String],
  tasks: [String],
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const batchSchema = new mongoose.Schema({
  projects: [projectSchema],
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  batches: [batchSchema],
});

export default mongoose.model('User', userSchema);
