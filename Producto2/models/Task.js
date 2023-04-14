const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id_task: Number,
  id_week: Number,
  name: String,
  startTime: Date,
  endTime: Date,
  description: String,
  participants: Number,
  isCompleted: Boolean
});

module.exports = mongoose.model('Task', taskSchema);
