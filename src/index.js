const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");
const dotenv = require("dotenv");
dotenv.config();

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

mongoose
  .connect(
    "mongodb+srv://guestpinecone:315l17Z46ZRXkJfr@cluster0.sjzdgok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    server
      .listen({ port: 3000 })
      .then(({ url }) => {
        console.log(`Your Apollo Server is running at ${url}`);
      })
      .catch((error) => {
        console.error("Error starting Apollo Server:", error);
      });
  })
  .catch((error) => {
    console.error("Error while connecting to MongoDB:", error);
  });
