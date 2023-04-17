const mongoose = require('mongoose');
const config = require('./config');

// Conexión a la base de datos MongoDB
mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
  })
  .catch((err) => {
    console.error(`Error de conexión a MongoDB: ${err}`);
  });

module.exports = mongoose.connection;
