const weeksController = require('../controllers/WeeksController');
const tasksController = require('../controllers/TasksController');

const resolvers = {
  Query: {
    getWeeks: () => weeksController.getWeeks(),
    getWeekById: (parent, args) => weeksController.getWeekById(args.id),
    getTasks: () => tasksController.getTasks(),
    getTaskById: (parent, args) => tasksController.getTaskById(args.id),
  },
  Mutation: {
    createWeek: (parent, args) => weeksController.createWeek(args.input),
    updateWeek: (parent, args) => weeksController.updateWeek(args.id, args.input),
    deleteWeek: (parent, args) => weeksController.deleteWeek(args.id),
    createTask: (parent, args) => tasksController.createTask(args.input),
    updateTask: (parent, args) => tasksController.updateTask(args.id, args.input),
    deleteTask: (parent, args) => tasksController.deleteTask(args.id),
  },
};

module.exports = resolvers;