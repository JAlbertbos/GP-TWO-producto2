const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./graphql');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://lau:1234@agendasemanal.zbsfqm3.mongodb.net/AgendaSemanal';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    try {
      await client.connect();
      const db = client.db('AgendaSemanal');
      const semanasCollection = db.collection('semanas');
      return { semanasCollection };
    } catch (error) {
      console.error('Error al conectar con MongoDB:', error);
    }
  },
});

const PORT = process.env.PORT || 3000;
server.listen(PORT).then(({ url }) => {
  console.log(`Servidor escuchando en ${url}`);
});