const Task = require('./models/task');
const Week = require('./models/week');

module.exports = {
  Query: {
    week: async (parent, { id }) => {
      return await Week.findById(id).populate('tasks');
    },
    weeks: async () => {
      return await Week.find().populate('tasks');
    },
  },

};
