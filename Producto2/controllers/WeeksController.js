const Week = require('../models/Week');

exports.getWeeks = async () => {
  return await Week.find();
};

exports.getWeekById = async (id) => {
  return await Week.findById(id);
};

exports.createWeek = async (weekData) => {
  const week = new Week(weekData);
  console.log('Week to be saved:', week); // Agrega esta línea para registrar la semana antes de guardarla
  const savedWeek = await week.save();
  console.log('Saved week:', savedWeek); // Agrega esta línea para registrar la semana guardada
  return savedWeek;
};

exports.updateWeek = async (id, weekData) => {
  return await Week.findByIdAndUpdate(id, weekData, { new: true });
};

exports.deleteWeek = async (id) => {
  return await Week.findByIdAndRemove(id);
};