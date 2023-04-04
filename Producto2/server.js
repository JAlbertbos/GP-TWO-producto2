const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphql/types');
const { resolvers } = require('./graphql/resolvers');
const WeekController = require('./controllers/WeekController');

const app = express();
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('<your-mongodb-connection-string>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuración de Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.applyMiddleware({ app });

// Rutas para Weeks
app.get('/weeks', WeekController.getAll);
app.post('/weeks', WeekController.create);
app.delete('/weeks/:id', WeekController.delete);

// Iniciar el servidor HTTP
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
});