const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  borderColor: {
    type: String,
    required: true,
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

module.exports = mongoose.model('Week', WeekSchema);