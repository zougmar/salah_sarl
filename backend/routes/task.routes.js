import express from 'express';
import { body } from 'express-validator';
import {
  getTasks,
  getMyTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('project').trim().notEmpty().withMessage('Project is required'),
  body('status')
    .optional()
    .isIn(['open', 'in-progress', 'completed'])
    .withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
];

router.get('/mine', getMyTasks);
router.get('/:id', getTaskById);
router.get('/', getTasks);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.delete('/:id', requireAdmin, deleteTask);

export default router;

