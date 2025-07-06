const mongoose = require('mongoose');

const actionLogSchema = new mongoose.Schema({
  action: String,
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActionLog', actionLogSchema);
