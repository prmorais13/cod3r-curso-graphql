const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');

const resolvers = require('./resolvers');
const context = require('./config/context');

require('dotenv').config();

const schemaPath = './schema/index.graphql';
const server = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
