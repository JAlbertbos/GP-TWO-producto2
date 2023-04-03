const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://David:1234@agendasemanal.zbsfqm3.mongodb.net/AgendaSemanal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas!');
})
.catch((error) => {
  console.log('Unable to connect to MongoDB Atlas:', error);
});