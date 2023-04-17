// graphql/schema.js
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Task {
    id: ID!
    title: String!
    description: String
    dueDate: String
    week: Week
  }

  type Week {
    id: ID!
    name: String!
    tasks: [Task]
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
    weeks: [Week]
    week(id: ID!): Week
  }

  type Mutation {
    createTask(title: String!, description: String, dueDate: String, weekId: ID!): Task
    updateTask(id: ID!, title: String, description: String, dueDate: String, weekId: ID): Task
    deleteTask(id: ID!): Task
    createWeek(name: String!): Week
    updateWeek(id: ID!, name: String): Week
    deleteWeek(id: ID!): Week
  }
`);

module.exports = schema;
