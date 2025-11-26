import express from 'express';
import { body } from 'express-validator';
import { getComments, createComment } from '../controllers/comment.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const commentValidation = [
  body('content').trim().notEmpty().withMessage('Comment content is required'),
];

router.get('/:taskId', getComments);
router.post('/:taskId', commentValidation, createComment);

export default router;

