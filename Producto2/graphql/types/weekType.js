const { gql } = require('apollo-server-express');

const weekType = gql`
  type Week {
    id: ID!
    name: String!
    weekNumber: Int!
    month: Int!
    year: Int!
    color: String!
    description: String
    tasks: [Task]
  }
`;

module.exports = weekType;
