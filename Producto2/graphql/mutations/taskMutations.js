const taskMutations = `
  createTask(description: String!, completed: Boolean!, weekId: ID!): Task
  updateTask(id: ID!, description: String, completed: Boolean): Task
  deleteTask(id: ID!): Task
`;

module.exports = taskMutations;