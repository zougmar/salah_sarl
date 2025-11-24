const Task = require('../models/Task');

const buildFilters = (query) => {
  const filters = {};
  if (query.status) filters.status = query.status;
  if (query.priority) filters.priority = query.priority;
  if (query.assignee) filters.assignee = query.assignee;
  if (query.project) filters.project = query.project;
  if (query.search) {
    filters.title = { $regex: query.search, $options: 'i' };
  }
  if (query.dueBefore) {
    filters.dueDate = { ...(filters.dueDate || {}), $lte: new Date(query.dueBefore) };
  }
  if (query.dueAfter) {
    filters.dueDate = { ...(filters.dueDate || {}), $gte: new Date(query.dueAfter) };
  }
  return filters;
};

const getTasks = async (req, res) => {
  const filters = buildFilters(req.query);
  const tasks = await Task.find(filters)
    .populate('assignee', 'name email role')
    .populate('createdBy', 'name email role')
    .sort({ createdAt: -1 });
  res.json(tasks);
};

const getMyTasks = async (req, res) => {
  const tasks = await Task.find({ assignee: req.user._id })
    .populate('assignee', 'name email role')
    .populate('createdBy', 'name email role')
    .sort({ dueDate: 1 });
  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignee', 'name email role')
    .populate('createdBy', 'name email role');
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
};

const createTask = async (req, res) => {
  const { title, description, dueDate, priority, project, assignee } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  // Validation pour s'assurer que assignee est soit un ObjectId valide, soit null
  const validAssignee = assignee && assignee.trim() !== '' ? assignee : null;

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    project,
    assignee: validAssignee,
    createdBy: req.user._id
  });

  const populated = await task.populate([
    { path: 'assignee', select: 'name email role' },
    { path: 'createdBy', select: 'name email role' }
  ]);

  res.status(201).json(populated);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const canEdit =
    req.user.role === 'admin' ||
    task.createdBy.toString() === req.user._id.toString() ||
    (task.assignee && task.assignee.toString() === req.user._id.toString());

  if (!canEdit) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;
  task.priority = req.body.priority ?? task.priority;
  task.dueDate = req.body.dueDate ?? task.dueDate;
  task.project = req.body.project ?? task.project;

  // Validation pour s'assurer que assignee est soit un ObjectId valide, soit null
  if (req.body.assignee !== undefined) {
    task.assignee = req.body.assignee && req.body.assignee.trim() !== '' ? req.body.assignee : null;
  }

  const updated = await task.save();
  const populated = await updated.populate([
    { path: 'assignee', select: 'name email role' },
    { path: 'createdBy', select: 'name email role' }
  ]);
  res.json(populated);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const canDelete =
    req.user.role === 'admin' || task.createdBy.toString() === req.user._id.toString();

  if (!canDelete) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await task.deleteOne();
  res.json({ message: 'Task removed' });
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, getMyTasks };

