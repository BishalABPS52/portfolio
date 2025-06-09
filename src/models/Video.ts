import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
    unique: true,
  },
  platform: {
    type: String,
    enum: ['youtube', 'vimeo', 'local'],
    default: 'youtube',
  },
  thumbnail: {
    type: String,
  },
  duration: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  category: {
    type: String,
    enum: ['tech', 'educational', 'entertainment', 'tutorial', 'other'],
    default: 'other',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  viewCount: {
    type: Number,
    default: 0,
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
videoSchema.index({ title: 'text', description: 'text' });
videoSchema.index({ category: 1 });
videoSchema.index({ createdAt: -1 });

export const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);