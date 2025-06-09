import mongoose, { Schema, Document } from 'mongoose';

export interface IHighscore extends Document {
  username: string;
  score: number;
  questionsAnswered: number;
  gameCompletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const HighscoreSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [50, 'Username cannot be longer than 50 characters']
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
    min: [0, 'Score cannot be negative']
  },
  questionsAnswered: {
    type: Number,
    required: [true, 'Questions answered is required'],
    min: [0, 'Questions answered cannot be negative'],
    max: [15, 'Questions answered cannot exceed 15']
  },
  gameCompletedAt: {
    type: Date,
    required: [true, 'Game completion time is required']
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
// Note: No duplicate username index since it's not unique in this collection
HighscoreSchema.index({ score: -1, questionsAnswered: -1 });
HighscoreSchema.index({ gameCompletedAt: -1 });

export default mongoose.models.Highscore || mongoose.model<IHighscore>('Highscore', HighscoreSchema);
