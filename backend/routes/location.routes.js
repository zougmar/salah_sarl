import express from 'express';
import { body } from 'express-validator';
import {
  submitLocation,
  getLocations,
  getLatestLocation,
} from '../controllers/location.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Validation rules
const locationValidation = [
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  body('accuracy').optional().isFloat({ min: 0 }).withMessage('Accuracy must be a positive number'),
];

// Submit location can work without auth (for public check-in)
router.post('/submit', locationValidation, submitLocation);

// Other routes require authentication
router.use(authenticate);

router.get('/', getLocations);
router.get('/latest/:employeeId', getLatestLocation);

export default router;

