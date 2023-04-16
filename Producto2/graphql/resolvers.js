// graphql/resolvers.js
const Task = require('../models/Task');

const resolvers = {
  tasks: async () => {
    return await Task.find();
  },
  task: async (args) => {
    return await Task.findById(args.id);
  },
  createTask: async (args) => {
    const newTask = new Task({
      title: args.title,
      description: args.description,
      dueDate: args.dueDate ? new Date(args.dueDate) : null,
    });

    return await newTask.save();
  },
  updateTask: async (args) => {
    const update = {
      ...(args.title && { title: args.title }),
      ...(args.description && { description: args.description }),
      ...(args.dueDate && { dueDate: new Date(args.dueDate) }),
    };

    return await Task.findByIdAndUpdate(args.id, update, { new: true });
  },
  deleteTask: async (args) => {
    return await Task.findByIdAndDelete(args.id);
  },
};

module.exports = resolvers;
