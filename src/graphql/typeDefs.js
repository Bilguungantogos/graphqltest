const { gql } = require("apollo-server");

module.exports = gql`
  type Job {
    id: ID
    title: String
    description: String
    requirements: Requirement
    minSalary: String
    maxSalary: String
    status: JobStatus
    applicant: [ID]
  }

  type Requirement {
    skill: String
    education: String
    language: String
    qualification: String
    workExperience: String
    others: String
  }

  type Applicant {
    userId: ID
    firstname: String
    lastname: String
    email: String
    phone: String
    cv: String
    status: ApplicantStatus
  }

  enum ApplicantStatus {
    PENDING
    SCHEDULED
    INTERVIEW_STAGE
    PASSED
    REJECTED
  }

  enum JobStatus {
    DRAFTED
    PUBLISHED
    CLOSED
  }

  input CreateJobInput {
    title: String!
    description: String!
    requirements: RequirementInput!
    minSalary: String!
    maxSalary: String!
    status: JobStatus!
  }

  input RequirementInput {
    skill: String
    education: String
    language: String
    qualification: String
    workExperience: String
    others: String
  }

  input UpdateJobInput {
    title: String!
    description: String!
    requirements: RequirementInput
    salary: Float
    minSalary: String
    maxSalary: String
  }

  input ChangeApplicantStatusInput {
    status: ApplicantStatus
  }

  input editTodoInput {
    title: String
  }

  type Query {
    getJobList: [Job!]!
    getJobDetails(jobId: ID!): Job
    getApplicants(jobId: ID): [Applicant]
  }

  type Mutation {
    createJob(input: CreateJobInput): Job!
    updateJob(id: ID!, input: UpdateJobInput): Job!
    deleteJob(id: ID!): ID!

    changeApplicantsStatus(input: ChangeApplicantStatusInput): Applicant!
    publishJobAd(jobId: ID): Job!
  }
`;
