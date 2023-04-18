const { gql } = require('apollo-server-express');

const taskType = gql`
  type Task {
    id: ID!
    name: String!
    description: String
    startTime: String!
    endTime: String!
    participants: String!
    location: String!
    week: Week!
  }
`;

module.exports = taskType;