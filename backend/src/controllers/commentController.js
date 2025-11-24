const Comment = require('../models/Comment');

const getCommentsByTask = async (req, res) => {
  const comments = await Comment.find({ taskId: req.params.taskId })
    .populate('authorId', 'name email role')
    .sort({ createdAt: 1 });
  res.json(comments);
};

const addComment = async (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({ message: 'Comment content is required' });
  }

  const comment = await Comment.create({
    taskId: req.params.taskId,
    authorId: req.user._id,
    content: req.body.content
  });

  const populated = await comment.populate({ path: 'authorId', select: 'name email role' });
  res.status(201).json(populated);
};

module.exports = { getCommentsByTask, addComment };

