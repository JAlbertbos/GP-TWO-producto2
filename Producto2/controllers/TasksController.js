const Task = require('../models/Task');
const Week = require('../models/Week');

exports.getWeeks = async () => {
  return await Week.find().populate('tasks');
};

exports.getWeekById = async (id) => {
  return await Week.findById(id).populate('tasks');
};

exports.getTasks = async () => {
  return await Task.find();
};

exports.getTaskById = async (id) => {
  return await Task.findById(id);
};

exports.createTask = async (taskData, weekId) => {
  const task = new Task(taskData);
  const savedTask = await task.save();
  await Week.findByIdAndUpdate(weekId, { $push: { tasks: savedTask._id } });

  return savedTask;
};

exports.updateTask = async (id, taskData) => {
  return await Task.findByIdAndUpdate(id, taskData, { new: true });
};

exports.deleteTask = async (id) => {
  return await Task.findByIdAndRemove(id);
};