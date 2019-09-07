const { gql } = require('apollo-server-lambda');

const types = gql`
  type Download {
    title: String,
    url: String
  }
  type Course {
    code: String,
    title: String,
    videoUrl: String,
    downloads: [Download],
    body: String
  }
`;

const queries = gql`
  type Query {
    courses: [Course]
  }
`;

const inputs = gql`
  input DownloadInput {
    title: String,
    url: String
  }
  input CourseInput {
    code: String!,
    title: String!,
    videoUrl: String,
    downloads: [DownloadInput],
    body: String
  }
  input CoursesInput {
    courses: [CourseInput]!
  }
`;

const mutations = gql`
  type Mutation {
    courses(input: CoursesInput!): [Course]
  }
`;

module.exports = gql`
  ${types}
  ${queries}
  ${inputs}
  ${mutations}
`;