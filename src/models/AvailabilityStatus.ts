import mongoose, { Schema, Document } from 'mongoose';

export interface IAvailabilityStatus extends Document {
  isAvailable: boolean;
  statusMessage: string;
  lastUpdated: Date;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const AvailabilityStatusSchema: Schema = new Schema({
  isAvailable: {
    type: Boolean,
    required: [true, 'Availability status is required'],
    default: true
  },
  statusMessage: {
    type: String,
    required: [true, 'Status message is required'],
    trim: true,
    maxlength: [200, 'Status message cannot be longer than 200 characters'],
    default: 'Available for Work'
  },
  lastUpdated: {
    type: Date,
    required: [true, 'Last updated time is required'],
    default: Date.now
  },
  updatedBy: {
    type: String,
    required: [true, 'Updated by field is required'],
    trim: true,
    default: 'admin'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
AvailabilityStatusSchema.index({ lastUpdated: -1 });
AvailabilityStatusSchema.index({ updatedBy: 1 });

export default mongoose.models.AvailabilityStatus || mongoose.model<IAvailabilityStatus>('AvailabilityStatus', AvailabilityStatusSchema);
