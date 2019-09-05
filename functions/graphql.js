require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server-lambda');
const mongoose = require('mongoose');
const Course = require('./models/Course');

const typeDefs = gql`
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
  type Query {
    hello: String,
    courses: [Course]
  }
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
  type Mutation {
    courses(input: CoursesInput!): Course
  }
`;

const connectDb = async () => {
  console.log(mongoose.connection.readyState)
  if (mongoose.connection.readyState !== 1) {
    const uri = process.env.MONGO_URI;
    try {
      await mongoose.connect(uri, { useNewUrlParser: true });
      console.log('connected to mongo db');
    } catch(error) {
      console.log(error);
    }
  }
}

const coursesResolver = async (root, args, context) => {
  await connectDb();
  const courses = await Course.find();
  return courses;
}

const rebuildCoursesResolver = async (root, args, context) => {
  const { code } = args.input.courses[0];
  console.log(code);
  await connectDb();
  console.log('connected')
  const course = await Course.findOne({ code });
  console.log('found', JSON.stringify(course));
  return course;
}

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world!";
    },
    courses: coursesResolver
  },
  Mutation: {
    courses: rebuildCoursesResolver
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
});