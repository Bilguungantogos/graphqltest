const { model, Schema } = require("mongoose");

const jobSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  requirements: {
    skill: String,
    education: String,
    language: String,
    qualification: String,
    workExperience: String,
    others: String,
  },
  minSalary: {
    type: String,
    require: true,
  },
  maxSalary: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

module.exports = model("Job", jobSchema);
