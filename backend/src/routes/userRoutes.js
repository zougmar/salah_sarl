const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updateProfile
} = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', authorizeRoles('admin'), getUsers);
router.post('/', authorizeRoles('admin'), createUser);
router.put('/profile', updateProfile);
router
  .route('/:id')
  .put(authorizeRoles('admin'), updateUser)
  .delete(authorizeRoles('admin'), deleteUser);

module.exports = router;

