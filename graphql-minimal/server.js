const express = require('express');
const fetch = require('node-fetch');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const fetchData = require('../helpers/fetchData');

// Construct a schema, using GraphQL schema language
const typeDefs = `
type Query {
  request(input1: Int): [Int]
}
`;

const localHostName = 'http://127.0.0.1:8888';

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    request: async (root, args) => {
      const person = await fetchData(`${localHostName}/person/${args.input1}`);
      const facility = await fetchData(`${localHostName}/facility/${person.val1}`);
      const exposure = await fetchData(`${localHostName}/exposure/${person.val2}`);

      return [facility.val3, exposure.val5];
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://0.0.0.0:4000${server.graphqlPath}`));
