const { model, Schema } = require("mongoose");

const todoSchema = new Schema({
  title: String,
  description: String,
  createdAt: String,
});

module.exports = model("Todo", todoSchema);
