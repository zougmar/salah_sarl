import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: -180,
      max: 180,
    },
    accuracy: {
      type: Number,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    deviceInfo: {
      userAgent: String,
      platform: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
locationSchema.index({ employeeId: 1, createdAt: -1 });
locationSchema.index({ createdAt: -1 });

export default mongoose.model('Location', locationSchema);

