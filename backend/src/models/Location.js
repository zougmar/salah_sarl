const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    deviceInfo: {
      userAgent: String,
      platform: String
    }
  },
  { timestamps: true }
);

// Index for efficient queries by employee and date
locationSchema.index({ employee: 1, createdAt: -1 });

module.exports = mongoose.model('Location', locationSchema);

