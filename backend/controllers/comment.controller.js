import { validationResult } from 'express-validator';
import Comment from '../models/Comment.model.js';
import Task from '../models/Task.model.js';

export const getComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Verify task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const comments = await Comment.find({ taskId })
      .populate('authorId', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { taskId } = req.params;
    const { content } = req.body;

    // Verify task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const comment = await Comment.create({
      content,
      taskId,
      authorId: req.user._id,
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      'authorId',
      'name email'
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

