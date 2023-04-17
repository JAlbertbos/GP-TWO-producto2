const weeksController = require('../controllers/WeeksController');
const tasksController = require('../controllers/TasksController');

const resolvers = {
  getWeeks: () => weeksController.getWeeks(),
  getWeekById: (args) => weeksController.getWeekById(args.id),
  getTasks: () => tasksController.getTasks(),
  getTaskById: (args) => tasksController.getTaskById(args.id),
  createWeek: (args) => weeksController.createWeek(args.input),
  updateWeek: (args) => weeksController.updateWeek(args.id, args.input),
  deleteWeek: (args) => weeksController.deleteWeek(args.id),
  createTask: (args) => tasksController.createTask(args.input),
  updateTask: (args) => tasksController.updateTask(args.id, args.input),
  deleteTask: (args) => tasksController.deleteTask(args.id),
};

module.exports = resolvers;