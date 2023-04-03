// Llamada a mongoose
const mongoose = require('mongoose');

// Creacion del Schema
const Schema = mongoose.Schema;

const taskSchema = new Schema({
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
