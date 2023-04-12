const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
  id_week: Number,
  name: String,
  number: Number,
  Priority: String,
  year: Number,
  colour: String,
  description: String
});

module.exports = mongoose.model('Week', weekSchema);
