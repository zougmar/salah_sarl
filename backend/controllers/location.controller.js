import { validationResult } from 'express-validator';
import Location from '../models/Location.model.js';

export const submitLocation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { latitude, longitude, accuracy, employeeId, deviceInfo } = req.body;

    // Use employeeId from body if provided, otherwise use authenticated user
    const finalEmployeeId = employeeId || req.user?._id || null;

    const location = await Location.create({
      latitude,
      longitude,
      accuracy,
      employeeId: finalEmployeeId,
      deviceInfo: deviceInfo || {},
    });

    res.status(201).json(location);
  } catch (error) {
    console.error('Submit location error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLocations = async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.query;
    const filter = {};

    // Only admins can view all locations, employees can only view their own
    if (req.user.role === 'admin' && employeeId) {
      filter.employeeId = employeeId;
    } else {
      filter.employeeId = req.user._id;
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const locations = await Location.find(filter)
      .populate('employeeId', 'name email')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(locations);
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLatestLocation = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Only admins can view other employees' locations
    if (req.user.role !== 'admin' && employeeId !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const location = await Location.findOne({ employeeId })
      .populate('employeeId', 'name email')
      .sort({ createdAt: -1 });

    if (!location) {
      return res.status(404).json({ message: 'No location found' });
    }

    res.json(location);
  } catch (error) {
    console.error('Get latest location error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

