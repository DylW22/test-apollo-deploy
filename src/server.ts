import { ApolloServer } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";

let books = [
  { title: "Book1", pages: 100 },
  { title: "Book2", pages: 33 },
];

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
    getBooks: Book
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

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
