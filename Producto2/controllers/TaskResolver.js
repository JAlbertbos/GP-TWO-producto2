const Task = require('./models/task');
const Week = require('./models/week');

module.exports = {
  Query: {
    task: async (parent, { id }) => {
      return await Task.findById(id).populate('week');
    },
    tasks: async () => {
      return await Task.find().populate('week');
    },
  },
}