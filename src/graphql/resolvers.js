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
    async updateJob(
      _,
      {
        id,
        input: {
          title,
          description,
          requirements,
          minSalary,
          maxSalary,
          salary,
        },
      }
    ) {
      const updatedJob = Job.updateOne(
        { _id: id },
        {
          title,
          description,
          requirements,
          salary,
          minSalary,
          maxSalary,
        }
      );
      console.log(
        id,
        title,
        description,
        requirements,
        minSalary,
        maxSalary,
        salary
      );
      return updatedJob;
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
//   updateJob(id: "6620cd4b6254ea90dbe689b1", input: {
//     title: "Updated Title",
//     description: "Updated Description",
//     requirements: {
//       skill: "Updated Skill",
//       education: "Updated Education",
//       language: "Updated Language",
//       qualification: "Updated Qualification",
//       workExperience: "Updated Work Experience",
//       others: "Updated Others"
//     },
//     minSalary: "3000",
//     maxSalary: "5000",
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
