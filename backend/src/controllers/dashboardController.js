const Task = require('../models/Task');

const getDashboardStats = async (req, res) => {
  const now = new Date();

  const [total, completed, inProgress, open, overdue] = await Promise.all([
    Task.countDocuments(),
    Task.countDocuments({ status: 'completed' }),
    Task.countDocuments({ status: 'in-progress' }),
    Task.countDocuments({ status: 'open' }),
    Task.countDocuments({ dueDate: { $lt: now }, status: { $ne: 'completed' } })
  ]);

  const tasksPerEmployee = await Task.aggregate([
    {
      $group: {
        _id: '$assignee',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  const upcomingDeadlines = await Task.find({ dueDate: { $gte: now } })
    .sort({ dueDate: 1 })
    .limit(5)
    .select('title dueDate status priority assignee')
    .populate('assignee', 'name email');

  res.json({
    totals: { total, completed, inProgress, open, overdue },
    tasksPerEmployee,
    upcomingDeadlines
  });
};

module.exports = { getDashboardStats };

