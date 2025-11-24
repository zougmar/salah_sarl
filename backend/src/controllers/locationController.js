const Location = require('../models/Location');

// Submit location data (public endpoint - no auth required for QR code scanning)
const submitLocation = async (req, res) => {
  try {
    const { latitude, longitude, accuracy, employeeId, deviceInfo } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Validate coordinates
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: 'Invalid coordinates' });
    }

    const location = await Location.create({
      employee: employeeId || null, // Optional: can be anonymous if not logged in
      latitude,
      longitude,
      accuracy: accuracy || null,
      deviceInfo: deviceInfo || {}
    });

    return res.status(201).json({
      message: 'Location submitted successfully',
      location: {
        id: location._id,
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: location.timestamp
      }
    });
  } catch (error) {
    console.error('Location submission error:', error);
    return res.status(500).json({ message: 'Failed to submit location', error: error.message });
  }
};

// Get locations (admin only)
const getLocations = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, limit = 100 } = req.query;

    const query = {};
    if (employeeId) query.employee = employeeId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const locations = await Location.find(query)
      .populate('employee', 'name email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    return res.json(locations);
  } catch (error) {
    console.error('Get locations error:', error);
    return res.status(500).json({ message: 'Failed to fetch locations', error: error.message });
  }
};

// Get latest location for an employee
const getLatestLocation = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const location = await Location.findOne({ employee: employeeId })
      .populate('employee', 'name email')
      .sort({ createdAt: -1 });

    if (!location) {
      return res.status(404).json({ message: 'No location found' });
    }

    return res.json(location);
  } catch (error) {
    console.error('Get latest location error:', error);
    return res.status(500).json({ message: 'Failed to fetch location', error: error.message });
  }
};

module.exports = {
  submitLocation,
  getLocations,
  getLatestLocation
};

