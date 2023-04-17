const Week = require('../models/Week');

exports.getWeeks = async () => {
  return await Week.find();
};

exports.getWeekById = async (id) => {
  return await Week.findById(id);
};

exports.createWeek = async (weekData) => {
  const week = new Week(weekData);
  return await week.save();
};

exports.updateWeek = async (id, weekData) => {
  return await Week.findByIdAndUpdate(id, weekData, { new: true });
};

exports.deleteWeek = async (id) => {
  return await Week.findByIdAndRemove(id);
};