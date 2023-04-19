const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLNonNull, GraphQLList, GraphQLSchema } = require('graphql');
const mongoose = require('mongoose');

// Definimos el tipo Task
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    id_task: { type: GraphQLNonNull(GraphQLInt) },
    id_week: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    startTime: { type: GraphQLNonNull(GraphQLString) },
    endTime: { type: GraphQLString },
    description: { type: GraphQLString },
    participants: { type: GraphQLInt },
    isCompleted: { type: GraphQLBoolean }
  })
});

// Definimos el tipo Week
const WeekType = new GraphQLObjectType({
  name: 'Week',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    id_week: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    number: { type: GraphQLNonNull(GraphQLInt) },
    priority: { type: GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    colour: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString }
  })
});

// Definimos los queries de Task
const TaskQuery = new GraphQLObjectType({
  name: 'TaskQuery',
  fields: {
    task: {
      type: TaskType,
      args: {
        id_task: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const task = await TaskModel.findOne({ id_task: args.id_task });
        return task;
      }
    },
    tasks: {
      type: GraphQLList(TaskType),
      resolve: async () => {
        const tasks = await TaskModel.find();
        return tasks;
      }
    }
  }
});

// Definimos los queries de Week
const WeekQuery = new GraphQLObjectType({
  name: 'WeekQuery',
  fields: {
    week: {
      type: WeekType,
      args: {
        id_week: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const week = await WeekModel.findOne({ id_week: args.id_week });
        return week;
      }
    },
    weeks: {
      type: GraphQLList(WeekType),
      resolve: async () => {
        const weeks = await WeekModel.find();
        return weeks;
      }
    }
  }
});

