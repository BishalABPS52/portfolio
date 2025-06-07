import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);
