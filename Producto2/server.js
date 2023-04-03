const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://David:@agendasemanal.zbsfqm3.mongodb.net/AgendaSemanal'; // URI de conexión a su base de datos
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
    if (err) throw err;
    const db = client.db('AgendaSemanal'); // Nombre de su base de datos
    // Realice operaciones CRUD aquí...
    client.close(); // Cierra la conexión a la base de datos
  });

  const Task = require('Producto2/models/Task');
  const Task = require('Producto2/models/Week');

