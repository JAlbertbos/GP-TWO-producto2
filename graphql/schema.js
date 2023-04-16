// graphql/schema.js
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Task {
    id: ID!
    title: String!
    description: String
    dueDate: String
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, dueDate: String): Task
    updateTask(id: ID!, title: String, description: String, dueDate: String): Task
    deleteTask(id: ID!): Task
  }
`);

module.exports = schema;