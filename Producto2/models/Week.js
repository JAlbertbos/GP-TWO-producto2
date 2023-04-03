// Llamada a mongoose
const mongoose = require('mongoose');

// Creacion del Schema
const Schema = mongoose.Schema;


const weekSchema = new Schema({
  id_week: Number,
  name: String,
  number: Number,
  month: Number,
  year: Number,
  colour: String,
  description: String
});

const Week = mongoose.model('Week',weekSchema);

module.exports = mongoose.model('Week', weekSchema);


