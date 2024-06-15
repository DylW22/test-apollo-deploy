"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlHandler = void 0;
var server_1 = require("@apollo/server");
var aws_lambda_1 = require("@as-integrations/aws-lambda");
var books = [
    { title: "Book1", pages: 100 },
    { title: "Book2", pages: 33 },
];
// The GraphQL schema
var typeDefs = "#graphql\n  type Query {\n    hello: String\n    getBooks: Book\n  }\n\n  type Book {\n    title: String\n    pages: Int\n  }\n";
// A map of functions which return data for the schema.
var resolvers = {
    Query: {
        hello: function () { return "world"; },
        getBooks: function () {
            return books;
        },
    },
};
// Set up Apollo Server
var server = new server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
});
exports.graphqlHandler = (0, aws_lambda_1.startServerAndCreateLambdaHandler)(server, 
// We will be using the Proxy V2 handler
aws_lambda_1.handlers.createAPIGatewayProxyEventV2RequestHandler());
