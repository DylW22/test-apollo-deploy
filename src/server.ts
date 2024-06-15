//import { ApolloServer } from "@apollo/server";
import { ApolloServer } from "@apollo/server"; //Deploy

import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda"; //Deploy*/

//const serverless = require("serverless-http"); //local
//const express = require("express"); //local
//const { ApolloServer } = require("apollo-server-lambda"); //local
let books = [
  { title: "Book1", pages: 100 },
  { title: "Book2", pages: 33 },
];

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
    getBooks: [Book]
  }

  type Book {
    title: String
    pages: Int
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
    getBooks: () => {
      return books;
    },
  },
};

//const production = process.env.NODE_ENV;
const production = true;
console.log(`Production status: `, production);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Deploy

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);

///////////////////////////////////
//exports.graphqlHandler = server.createHandler(); //Local
/*
exports.graphqlHandler = server.createHandler({
  playground: true,
  introspection: true,
  cors: {
    origin: "*",
    credentials: true,
  },
});
*/
/*if (!production) {
  // Set up Apollo Server
  const app = express();

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });

  //const server = new Ap
} //Local
*/
