import mongoose from 'mongoose';

const poemSchema = new mongoose.Schema({
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
  author: {
    type: String,
    default: 'Bishal Shrestha',
  },
  tags: [{
    type: String,
  }],
  isPublished: {
    type: Boolean,
    default: true,
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

// Index for efficient searching
poemSchema.index({ title: 'text', content: 'text' });
poemSchema.index({ language: 1 });
poemSchema.index({ createdAt: -1 });

export const Poem = mongoose.models.Poem || mongoose.model('Poem', poemSchema);
