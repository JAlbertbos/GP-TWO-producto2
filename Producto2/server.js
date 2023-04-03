const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const { MongoClient } = require('mongodb');

require("./config/database.js");
const { typeDefs } = require('./config/config.js');

const {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require('./controllers/TasksController.js');

const {
  getWeeks,
  getWeekById,
  createWeek,
  updateWeekById,
  deleteWeekById
} = require('./controllers/WeeksController.js');

const app = express();
const router = express.Router();
const port = 8080;

const uri = 'mongodb+srv://Tamara:1234@agendasemanal.zbsfqm3.mongodb.net/AgendaSemanal';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
  if (err) throw err;
  const db = client.db('AgendaSemanal');
  console.log('Conectado a la base de datos MongoDB');
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

router.use(function(req, res, next){
  console.log('/' + req.method);
  next();
});

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'Dashboard.html'));
});

router.get('/weektasks', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'Weektasks.html'));
});

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTaskById);
router.delete('/tasks/:id', deleteTaskById);

router.get('/weeks', getWeeks);
router.get('/weeks/:id', getWeekById);
router.post('/weeks', createWeek);
router.put('/weeks/:id', updateWeekById);
router.delete('/weeks/:id', deleteWeekById);

// creacion de los resolvers
const resolvers = {
  Query: {

    hello: () => 'world',
    week: getWeeks,
    task: getTasks,

    getweeks: getWeekById ,
    gettasks: getTaskById,
  },

  Mutation: {
    createweek: createWeek,
    updateweek: updateWeekById,
    deleteweek: deleteWeekById,

    createtask: createTask,
    updatetask: updateTaskById,
    deletetask: deleteTaskById,
  }
}



app.use('/', router);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
