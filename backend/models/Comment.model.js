import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    authorId: {
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
commentSchema.index({ taskId: 1, createdAt: -1 });

export default mongoose.model('Comment', commentSchema);

