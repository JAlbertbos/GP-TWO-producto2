const Task = require('../models/Task');

exports.getTasks = async () => {
  return await Task.find();
};

exports.getTaskById = async (id) => {
  return await Task.findById(id);
};

exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

exports.updateTask = async (id, taskData) => {
  return await Task.findByIdAndUpdate(id, taskData, { new: true });
};

exports.deleteTask = async (id) => {
  return await Task.findByIdAndRemove(id);
};