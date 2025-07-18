const ActionLog = require('../models/ActionLog');

exports.getLogs = async (req, res) => {
  const logs = await ActionLog.find().sort({ timestamp: -1 }).limit(20).populate('task user');
  res.json(logs);
};
