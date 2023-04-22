const Week = require("../models/Week");

exports.getWeeks = async () => {
  try {
    return await Week.find().populate("tasks");
  } catch (err) {
    console.error(err);
    throw new Error("Error retrieving weeks");
  }
};

exports.getWeekById = async (id) => {
  try {
    return await Week.findById(id).populate("tasks");
  } catch (err) {
    console.error(err);
    throw new Error("Error retrieving week");
  }
};

exports.createWeek = async (weekData) => {
  try {
    const newWeek = new Week(weekData);
    return await newWeek.save();
  } catch (err) {
    console.error(err);
    throw new Error("Error creando semana");
  }
};

exports.deleteWeekById = async (id) => {
    try {
      return await Week.findByIdAndRemove(id);
    } catch (err) {
      console.error(err);
      throw new Error("Error borrando semana");
    }
  };
