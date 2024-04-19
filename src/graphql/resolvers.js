const Job = require("../../models/Job");
const Applicant = require("../../models/Applicant");

module.exports = {
  Query: {
    async getJobList() {
      return await Job.find();
    },
    async getJobDetails(_, { ID }) {
      return await Job.findById(ID);
    },
    async getApplicants(_, { ID }) {
      return await Applicant.find({ jobId: ID });
    },
  },
  Mutation: {
    async createJob(
      _,
      {
        input: {
          title,
          description,
          requirements,
          minSalary,
          maxSalary,
          status,
        },
      }
    ) {
      const createJob = new Job({
        title,
        description,
        requirements: requirements,
        minSalary,
        maxSalary,
        status,
      });

      const res = await createJob.save();
      return res;
    },
    async createApplicant(
      _,
      { input: { firstname, lastname, email, phone, cv } }
    ) {
      const createApplicant = new Applicant({
        firstname,
        lastname,
        email,
        phone,
        cv,
      });

      const res = await createApplicant.save();
      return res;
    },
    async updateJob(
      _,
      {
        id,
        input: {
          title,
          description,
          requirements: {
            skill,
            education,
            language,
            qualification,
            workExperience,
            others,
          },
          minSalary,
          maxSalary,
          salary,
        },
      }
    ) {
      const updatedJob = await Job.updateOne(
        { _id: id },
        {
          title,
          description,
          requirements: {
            skill,
            education,
            language,
            qualification,
            workExperience,
            others,
          },
          minSalary,
          maxSalary,
          salary,
        }
      );
      const newUpdatedJob = await Job.findById(id);
      return newUpdatedJob;
    },
    async deleteJob(_, { id }) {
      const deletedJob = await Job.findByIdAndDelete(id);
      if (!deletedJob) {
        console.warn(`Job with ID ${id} not found.`);
        return;
      }
      return deletedJob._id;
    },
    async changeApplicantsStatus(_, { id, input: { status } }) {
      const changeApplicant = await Applicant.updateOne(
        { _id: id },
        { status: status }
      );
      const changedApplicant = await Applicant.findById(id);
      return changedApplicant;
    },
    async publishJobAd(_, { jobId }) {
      const changeJobStatusToPublish = await Job.updateOne(
        { _id: jobId },
        { status: "PUBLISH" }
      );
      const changedJob = await Job.findById(jobId);
      return changedJob;
    },
  },
};

// mutation CreateJob {
//   createJob(input: {
//     title: "",
//     description: "",
//     requirements: {
//       skill: "",
//       education: "",
//       language: "",
//       qualification: "",
//       workExperience: "",
//       others: ""
//     },
//     minSalary: "",
//     maxSalary: "",
//     status: DRAFTED
//   }) {
//     title
//     description
//     requirements {
//       skill
//       education
//       language
//       qualification
//       workExperience
//       others
//     }
//     minSalary
//     maxSalary
//     status
//   }
// }

// mutation UpdateJob {
//   updateJob(id: "6620cd646254ea90dbe689b3", input: {
//     title: "dadadadadada Title",
//     description: "Updatedminmax bhq Description",
//     requirements: {
//       skill: "Updated Skill",
//       education: "Updated Education",
//       language: "Updated Language",
//       qualification: "Updated Qualification",
//       workExperience: "Updated Work Experience",
//       others: "Updated Others"
//     },
//     maxSalary :"30"
//   }) {
//     title
//     description
//     requirements {
//       skill
//       education
//       language
//       qualification
//       workExperience
//       others
//     }
//     minSalary
//     maxSalary
//     status
//   }
// }

// mutation{
//   changeApplicantsStatus(id: "662216ecbe5b6edc8ece1266",input:{status:REJECTED}) {
//     status
//   }
// }

// mutation {
//   publishJobAd(jobId: "6620cd6b6254ea90dbe689b5") {
//     applicant
//     description
//     maxSalary
//   }
// }
