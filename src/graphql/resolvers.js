const Todo = require("../../models/Todo");

module.exports = {
  Query: {
    async todo(_, { ID }) {
      return await Todo.findbyId(ID);
    },
    async getTodos(_, { amount }) {
      return await Todo.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
  Mutation: {
    async createTodo(_, { todoInput: { title, description } }) {
      const createTodo = new Todo({
        title: title,
        description: description,
        createdAt: new Date().toISOString(),
      });
      const res = await createTodo.save();
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteTodo(_, { ID }) {
      const wasDeleted = (await Todo.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editTodoInput(_, { ID, todoInput: { name, description } }) {
      const wasEdited = (
        await Todo.updateOne(
          { _id: ID },
          { name: name, description: description }
        )
      ).modifiedCount;
      return wasEdited; // 1 bol editlesen 0 bol editleegui
    },
  },
};
