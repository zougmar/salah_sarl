const express = require('express');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getMyTasks
} = require('../controllers/taskController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(getTasks).post(authorizeRoles('admin'), createTask);
router.get('/mine', getMyTasks);
router.route('/:id').get(getTaskById).put(updateTask).delete(authorizeRoles('admin'), deleteTask);

module.exports = router;

