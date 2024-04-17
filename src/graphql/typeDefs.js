const { gql } = require("apollo-server");

module.exports = gql`
  type Todo {
    id: ID!
    title: String
    description: String
    createdAt: String
  }

  input TodoInput {
    title: String
    description: String
  }

  input editTodoInput {
    title: String
  }

  type Query {
    todo(ID: ID!): Todo!
    getTodos(amount: Int): [Todo]
  }

  type Mutation {
    createTodo(todoInput: TodoInput): Todo!
    deleteTodo(ID: ID!): Boolean
    editTodoInput(ID: ID!, todoInput: TodoInput): Boolean
  }
`;
