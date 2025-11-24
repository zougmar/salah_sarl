const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getDashboardStats);

module.exports = router;

