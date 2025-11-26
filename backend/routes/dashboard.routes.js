import express from 'express';
import { getStats } from '../controllers/dashboard.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getStats);

export default router;

