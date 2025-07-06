const Task = require('../models/Task');
const User = require('../models/User');
const logAction = require('../utils/logger');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find().populate('assignedTo');
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  await logAction('created', task._id, req.user.id);
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (new Date(req.body.lastEdited) < task.lastEdited) {
    return res.status(409).json({ message: 'Conflict detected', current: task });
  }

  Object.assign(task, req.body);
  task.lastEdited = new Date();
  await task.save();
  await logAction('updated', task._id, req.user.id);
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  await logAction('deleted', req.params.id, req.user.id);
  res.json({ message: 'Task deleted' });
};

exports.smartAssign = async (req, res) => {
  const users = await User.find();
  let minTasks = Infinity;
  let selectedUser = null;

  for (const user of users) {
    const count = await Task.countDocuments({ assignedTo: user._id, status: { $ne: 'Done' } });
    if (count < minTasks) {
      minTasks = count;
      selectedUser = user;
    }
  }

  const task = await Task.findById(req.params.id);
  task.assignedTo = selectedUser._id;
  await task.save();
  await logAction('smart assigned', task._id, req.user.id);
  res.json(task);
};
