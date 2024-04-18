const { ObjectId } = require("mongodb");
const { model, Schema } = require("mongoose");

const applicantSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  cv: {
    type: String,
  },
  status: {
    type: String,
    default: "PENDING",
  },
  jobId: {
    type: Schema.ObjectId,
    ref: "Job",
    require: true,
  },
});

module.exports = model("Applicant", applicantSchema);
