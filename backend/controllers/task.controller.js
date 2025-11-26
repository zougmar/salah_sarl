import { validationResult } from 'express-validator';
import Task from '../models/Task.model.js';

export const getTasks = async (req, res) => {
  try {
    const { status, priority, project, assignee } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (project) filter.project = project;
    if (assignee) filter.assignee = assignee;

    const tasks = await Task.find(filter)
      .populate('assignee', 'name email role')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.user._id })
      .populate('assignee', 'name email role')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    console.error('Get my tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignee', 'name email role')
      .populate('createdBy', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const taskData = {
      ...req.body,
      createdBy: req.user._id,
    };

    // Convert assignee string to ObjectId if provided
    if (req.body.assignee && req.body.assignee !== '') {
      taskData.assignee = req.body.assignee;
    } else {
      taskData.assignee = null;
    }

    const task = await Task.create(taskData);
    const populatedTask = await Task.findById(task._id)
      .populate('assignee', 'name email role')
      .populate('createdBy', 'name email');

    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Employees can only update their own tasks
    if (req.user.role !== 'admin' && task.assignee?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    // Handle assignee field
    if (req.body.assignee !== undefined) {
      if (req.body.assignee === '' || req.body.assignee === null) {
        task.assignee = null;
      } else {
        task.assignee = req.body.assignee;
      }
    }

    // Update other fields
    Object.keys(req.body).forEach((key) => {
      if (key !== 'assignee' && req.body[key] !== undefined) {
        task[key] = req.body[key];
      }
    });

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate('assignee', 'name email role')
      .populate('createdBy', 'name email');

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only admins can delete tasks
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

