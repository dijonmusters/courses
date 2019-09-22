const { gql } = require('apollo-server-lambda');

const types = gql`
  type Course {
    code: String!,
    title: String!,
    description: String,
    difficulty: String
  }
  type Download {
    title: String,
    url: String
  }
  type Lesson {
    courseCode: String!,
    moduleName: String!,
    title: String!,
    body: String!,
    slug: String!,
    videoUrl: String,
    downloads: [Download]
  }
`;

const inputs = gql`
  input DownloadInput {
    title: String,
    url: String
  }
  input LessonInput {
    courseCode: String!,
    moduleName: String!,
    title: String!,
    body: String!,
    slug: String!,
    videoUrl: String,
    downloads: [DownloadInput]
  }
  input LessonsInput {
    lessons: [LessonInput]!
  }
  input LessonName {
    lessonName: String!
  }
`;

const queries = gql`
  type Query {
    courses: [Course],
    lessons: [Lesson],
    lesson(input: LessonName!): Lesson
  }
`;

const mutations = gql`
  type Mutation {
    lessons(input: LessonsInput!): [Lesson]
  }
`;

module.exports = gql`
  ${types}
  ${queries}
  ${inputs}
  ${mutations}
`;