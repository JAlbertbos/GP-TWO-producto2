const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const config = require('./config');

const tasksController = require('./controllers/TasksController');
const weeksController = require('./controllers/WeeksController');

const app = express();

// Conexión con MongoDB
mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware para servir archivos estáticos y parsear el cuerpo de las solicitudes
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

// Rutas de la API para tareas
app.get('/api/tasks', tasksController.getTasks); // Obtener todas las tareas
app.get('/api/tasks/:taskId', tasksController.getTaskById); // Obtener una tarea por ID
app.post('/api/tasks', tasksController.createTask); // Crear una nueva tarea
app.put('/api/tasks/:taskId', tasksController.updateTaskById); // Actualizar una tarea por ID
app.delete('/api/tasks/:taskId', tasksController.deleteTaskById); // Eliminar una tarea por ID

// Rutas de la API para semanas
app.get('/api/weeks', weeksController.getWeeks); // Obtener todas las semanas
app.get('/api/weeks/:weekId', weeksController.getWeekById); // Obtener una semana por ID
app.post('/api/weeks', weeksController.createWeek); // Crear una nueva semana
app.put('/api/weeks/:weekId', weeksController.updateWeekById); // Actualizar una semana por ID
app.delete('/api/weeks/:weekId', weeksController.deleteWeekById); // Eliminar una semana por ID

// Iniciar el servidor
app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
