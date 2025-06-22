import mongoose, { Schema } from 'mongoose';

const userschema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
    performance: { type: Number, default: 0 },
  password: {
    type: String,
    required: true
  },

});

export default mongoose.model('User', userschema);
