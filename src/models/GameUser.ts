import mongoose from 'mongoose';

const gameUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  avatar: {
    type: String,
    default: '/assets/images/default-avatar.png',
  },
  totalGamesPlayed: {
    type: Number,
    default: 0,
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  averageScore: {
    type: Number,
    default: 0,
  },
  bestScore: {
    type: Number,
    default: 0,
  },
  gamesStats: {
    quiztime: {
      gamesPlayed: { type: Number, default: 0 },
      bestScore: { type: Number, default: 0 },
      totalQuestions: { type: Number, default: 0 },
      correctAnswers: { type: Number, default: 0 },
      averageTime: { type: Number, default: 0 }, // in seconds
    },
    // Can add more games here
  },
  achievements: [{
    name: String,
    description: String,
    unlockedAt: { type: Date, default: Date.now },
    icon: String,
  }],
  preferences: {
    theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    notifications: { type: Boolean, default: true },
    publicProfile: { type: Boolean, default: true },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  banReason: {
    type: String,
  },
  lastLoginAt: {
    type: Date,
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

// Indexes for efficient querying
// Note: username and email already have unique indexes from schema definition
gameUserSchema.index({ totalScore: -1 });
gameUserSchema.index({ bestScore: -1 });
gameUserSchema.index({ createdAt: -1 });
gameUserSchema.index({ isActive: 1, isBanned: 1 });

// Update the updatedAt field before saving
gameUserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const GameUser = mongoose.models.GameUser || mongoose.model('GameUser', gameUserSchema);