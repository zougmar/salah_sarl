import express from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  createUser,
  updateUser,
  updateProfile,
  deleteUser,
} from '../controllers/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const userValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'employee']).withMessage('Invalid role'),
];

const profileValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
];

router.get('/', requireAdmin, getUsers);
router.post('/', requireAdmin, userValidation, createUser);
router.put('/profile', profileValidation, updateProfile);
router.put('/:id', requireAdmin, profileValidation, updateUser);
router.delete('/:id', requireAdmin, deleteUser);

export default router;

