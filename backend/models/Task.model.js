import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'completed'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    project: {
      type: String,
      required: [true, 'Project is required'],
      trim: true,
    },
    dueDate: {
      type: Date,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
taskSchema.index({ assignee: 1, status: 1 });
taskSchema.index({ project: 1 });
taskSchema.index({ dueDate: 1 });

export default mongoose.model('Task', taskSchema);

