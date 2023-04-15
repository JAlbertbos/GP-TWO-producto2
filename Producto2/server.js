const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

// Conexión con MongoDB
const MONGODB_URI = 'mongodb+srv://David:1234@agendasemanal.zbsfqm3.mongodb.net/AgendaSemanal';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Definir el modelo de datos
const tareaSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
});

const Tarea = mongoose.model('Tarea', tareaSchema);

// Configurar Express para servir archivos estáticos y estilos CSS
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas de la aplicación
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Dashboard.html'));
  res.sendFile(path.join(__dirname, 'Weektasks.html'));
});

// Definir el esquema GraphQL para las tareas
const taskSchema = buildSchema(`
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

// Funciones para resolver consultas y mutaciones
const taskResolvers = {
  tasks: async () => {
    return await Tarea.find();
  },
  task: async (args) => {
    return await Tarea.findById(args.id);
  },
  createTask: async (args) => {
    const newTask = new Tarea({
      title: args.title,
      description: args.description,
      dueDate: args.dueDate ? new Date(args.dueDate) : null,
    });

    return await newTask.save();
  },
  updateTask: async (args) => {
    const update = {
      ...(args.title && { title: args.title }),
      ...(args.description && { description: args.description }),
      ...(args.dueDate && { dueDate: new Date(args.dueDate) }),
    };

    return await Tarea.findByIdAndUpdate(args.id, update, { new: true });
  },
  deleteTask: async (args) => {
    return await Tarea.findByIdAndDelete(args.id);
  },
};

// Ruta para GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: taskSchema,
    rootValue: taskResolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
