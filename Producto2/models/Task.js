const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  participants: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  week: {
    type: Schema.Types.ObjectId,
    ref: 'Week',
    required: true,
  },
});

const WeekSchema = new Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  tasks: [TaskSchema],
});

module.exports = {
  Task: mongoose.model('Task', TaskSchema),
  Week: mongoose.model('Week', WeekSchema),
};