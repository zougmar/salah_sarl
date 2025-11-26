import express from 'express';
import { body } from 'express-validator';
import { login, register, getProfile } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation rules
const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'employee']).withMessage('Invalid role'),
];

router.post('/login', loginValidation, login);
router.post('/register', registerValidation, register);
router.get('/me', authenticate, getProfile);

export default router;

