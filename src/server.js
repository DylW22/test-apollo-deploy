"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlHandler = void 0;
//import { ApolloServer } from "@apollo/server";
var server_1 = require("@apollo/server"); //Deploy
var aws_lambda_1 = require("@as-integrations/aws-lambda"); //Deploy*/
//const serverless = require("serverless-http"); //local
//const express = require("express"); //local
//const { ApolloServer } = require("apollo-server-lambda"); //local
var books = [
    { title: "Book1", pages: 100 },
    { title: "Book2", pages: 33 },
];
// The GraphQL schema
var typeDefs = "#graphql\n  type Query {\n    hello: String\n    getBooks: [Book]\n  }\n\n  type Book {\n    title: String\n    pages: Int\n  }\n";
// A map of functions which return data for the schema.
var resolvers = {
    Query: {
        hello: function () { return "world"; },
        getBooks: function () {
            return books;
        },
    },
};
//const production = process.env.NODE_ENV;
var production = true;
console.log("Production status: ", production);
var server = new server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});
//Deploy
exports.graphqlHandler = (0, aws_lambda_1.startServerAndCreateLambdaHandler)(server, 
// We will be using the Proxy V2 handler
aws_lambda_1.handlers.createAPIGatewayProxyEventV2RequestHandler());
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
