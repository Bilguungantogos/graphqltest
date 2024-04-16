const { ApolloServer, gql } = require("apollo-server");
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: String }) => {
  console.log(`Server is listening at ${url}`);
});