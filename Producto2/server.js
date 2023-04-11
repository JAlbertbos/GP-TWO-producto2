
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// Conexión a la base de datos MongoDB
mongoose.connect(config.databaseURL, { useNewUrlParser: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
    app.listen(config.port, () => {
      console.log(`Servidor web escuchando en el puerto ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(`Error de conexión a MongoDB: ${err}`);
  });


