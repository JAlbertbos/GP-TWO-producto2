const PORT = 4000;
server.listen(PORT).then(({ url }) => {
  console.log(`Servidor escuchando en ${url}`);
});

const { gql } = require('apollo-server');

// Definición de los tipos (typeDefs)
const typeDefs = gql`
  type Week {
    _id: ID!
    name: String!
    week: Int!
    month: Int!
    year: Int!
    description: String
  }

  type Query {
    getWeeks: [Week]
    getWeekById(id: ID!): Week
  }

  type Mutation {
    createWeek(name: String!, week: Int!, month: Int!, year: Int!, description: String): Week
    updateWeek(id: ID!, name: String, week: Int, month: Int, year: Int, description: String): Week
    deleteWeek(id: ID!): Boolean
  }
`;

// Resolvers
const resolvers = {
  Query: {
    getWeeks: async (_, __, { semanasCollection }) => {
      try {
        const semanas = await semanasCollection.find().toArray();
        return semanas;
      } catch (error) {
        console.error('Error al obtener las semanas:', error);
        return [];
      }
    },
    getWeekById: async (_, { id }, { semanasCollection }) => {
      try {
        const semana = await semanasCollection.findOne({ _id: id });
        return semana;
      } catch (error) {
        console.error('Error al obtener la semana por ID:', error);
        return null;
      }
    },
  },
  Mutation: {
    // Aquí debes agregar las funciones para crear, actualizar y eliminar semanas
    // Debes hacer uso de semanasCollection para interactuar con la base de datos
    // Recuerda que para el manejo de errores, puedes usar try-catch
  },
};

module.exports = { typeDefs, resolvers };