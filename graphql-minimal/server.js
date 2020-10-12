const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fetch = require('node-fetch');
const { makeExecutableSchema } = require('graphql-tools');

// Construct a schema, using GraphQL schema language
const typeDefs = `
type Query {
  request(input1: Int): [Int]
}
`;

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    request: async (root, args) => {
      const person = await fetch(`http://127.0.0.1:8888/person/${args.input1}`).then((res) => res.json());
      const facility = await fetch(`http://127.0.0.1:8888/facility/${person.val1}`).then((res) => res.json());
      const exposure = await fetch(`http://127.0.0.1:8888/exposure/${person.val2}`).then((res) => res.json());

      return [facility.val3, exposure.val5];
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
