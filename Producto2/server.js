const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const config = require('./config/config');
const database = require('./config/database');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const path = require('path'); 

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Dashboard.html'));
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configura el middleware de GraphQL
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  }));
  

// Conexión a la base de datos MongoDB
database.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
database.once('open', function() {
  console.log('Conexión a MongoDB exitosa');
});

app.get('/weeks', async (req, res) => {
  const weeks = await weeksController.getWeeks();
  res.json(weeks);
});

app.get('/weeks/:id', async (req, res) => {
  const week = await weeksController.getWeekById(req.params.id);
  res.json(week);
});

app.post('/weeks', async (req, res) => {
  const week = await weeksController.createWeek(req.body);
  res.json(week);
});

app.put('/weeks/:id', async (req, res) => {
  const week = await weeksController.updateWeek(req.params.id, req.body);
  res.json(week);
});

app.delete('/weeks/:id', async (req, res) => {
  const result = await weeksController.deleteWeek(req.params.id);
  res.json(result);
});

app.get('/tasks', async (req, res) => {
  const tasks = await tasksController.getTasks();
  res.json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const task = await tasksController.getTaskById(req.params.id);
  res.json(task);
});

app.post('/tasks', async (req, res) => {
  const task = await tasksController.createTask(req.body);
  res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
  const task = await tasksController.updateTask(req.params.id, req.body);
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  const result = await tasksController.deleteTask(req.params.id);
  res.json(result);
});

app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});

