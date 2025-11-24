const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password, role: role || 'employee' });
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updated = await user.save();
  res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await user.deleteOne();
  res.json({ message: 'User removed' });
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name || user.name;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updated = await user.save();
  res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role });
};

module.exports = { getUsers, createUser, updateUser, deleteUser, updateProfile };

