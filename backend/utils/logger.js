const ActionLog = require('../models/ActionLog');

async function logAction(action, taskId, userId) {
  await ActionLog.create({ action, task: taskId, user: userId });
}

module.exports = logAction;
