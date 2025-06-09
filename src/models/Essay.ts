import mongoose from 'mongoose';

const essaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['english', 'nepali', 'mixed'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Essay = mongoose.models.Essay || mongoose.model('Essay', essaySchema);
export default Essay;
