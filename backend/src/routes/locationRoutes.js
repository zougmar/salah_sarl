const express = require('express');
const router = express.Router();
const { submitLocation, getLocations, getLatestLocation } = require('../controllers/locationController');
const { protect, authorizeRoles } = require('../middleware/auth');

// Public endpoint for QR code scanning
router.post('/submit', submitLocation);

// Protected routes (admin only)
router.get('/', protect, authorizeRoles('admin'), getLocations);
router.get('/latest/:employeeId', protect, authorizeRoles('admin'), getLatestLocation);

module.exports = router;

