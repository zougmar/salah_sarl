const express = require('express');
const { getCommentsByTask, addComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.route('/:taskId').get(getCommentsByTask).post(addComment);

module.exports = router;

