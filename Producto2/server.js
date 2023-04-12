const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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

// Definir el modelo de datos
const tareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fecha: Date,
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

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor web iniciado en el puerto ${PORT}`));