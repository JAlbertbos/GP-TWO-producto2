const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();



// Conexión con MongoDB
const MONGODB_URI = 'mongodb+srv://David:1234@agendasemanal.zbsfqm3.mongodb.net/AgendaSemanal';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas de la aplicación
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Producto2', 'Dashboard.html'));
});

app.get('/weektasks', (req, res) => {
  res.sendFile(path.join(__dirname, 'Producto2', 'Weektasks.html'));
});

// Ruta para GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
