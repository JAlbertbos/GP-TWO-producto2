const mongoose = require('mongoose');

export const typeDefs = `#graphql
type Task {
  _id: Number
  _id_week: Number,
  name: String,
  startTime: Date,
  endTime: Date,
  description: String,
  participants: Number,
  isCompleted: Boolean
}

type Week {

  id_week: Number,
  name: String,
  number: Number,
  month: Number,
  year: Number,
  colour: String,
  description: Stringid: String
  Tasks: [Task]
}

type Query {
  hello: String

  week(_id: ID): Week
  task(_id: ID): Task

  allWeek: [Week]
  allTask: [Task]
}

type Mutation {
  createTask(
    _id_week: Number,
    name: String,
    startTime: Date,
    endTime: Date,
    description: String,
    participants: Number,
    isCompleted: Boolean
    
  ): Task
  updateTaskById(
    _id: Number,
    _id_week: Number,
    name: String,
    startTime: Date,
    endTime: Date,
    description: String,
    participants: Number,
    isCompleted: Boolean
  ): Task
  deleteTaskById(
    _id: String,
  ): Task

  getTaskById(
    _id_week: Number,
  name: String,
  number: Number,
  month: Number,
  year: Number,
  colour: String,
  description: String
  ): Week
  updateWeekById(
    _id: Number,
    _id_week: Number,
  name: String,
  number: Number,
  month: Number,
  year: Number,
  colour: String,
  description: String,
  ): Week
  deleteWeekById(
    _id: Number,
  ): Week
}
`


mongoose.connect('mongodb+srv://Tamara:1234@agendasemanal.zbsfqm3.mongodb.net/AgendaSemanal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas!');
})
.catch((error) => {
  console.log('Unable to connect to MongoDB Atlas:', error);
});

