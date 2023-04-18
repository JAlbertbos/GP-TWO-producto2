const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Week {
    _id: ID
    name: String
    week: Int
    priority: Int
    year: Int
    description: String
    borderColor: String
  }

  type Task {
    _id: ID
    name: String
    description: String
    startTime: String
    endTime: String
    participants: String
    location: String
    completed: Boolean
  }

  type Query {
    getWeeks: [Week]
    getWeekById(id: ID!): Week
    getTasks: [Task]
    getTaskById(id: ID!): Task
  }

  type Mutation {
    createWeek(input: WeekInput): Week
    updateWeek(id: ID!, input: WeekInput): Week
    deleteWeek(id: ID!): Week
    createTask(input: TaskInput): Task
    updateTask(id: ID!, input: TaskInput): Task
    deleteTask(id: ID!): Task
  }

  input WeekInput {
    name: String!
    week: Int!
    priority: Int!
    year: Int!
    description: String!
    borderColor: String!
  }

  input TaskInput {
    name: String!
    description: String!
    startTime: String!
    endTime: String!
    participants: String!
    location: String!
    completed: Boolean!
  }
`);

module.exports = schema;