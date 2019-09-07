const { connectDb } = require('../db');

const coursesResolver = async (root, args, context) => {
  const { Course } = await connectDb();
  const courses = await Course.find();
  return courses;
}

const rebuildCoursesResolver = async (root, args, context) => {
  const { courses } = args.input;
  const { Course } = await connectDb();
  await Course.deleteMany();
  await Course.insertMany(courses);
  return courses;
}

module.exports = {
  Query: {
    courses: coursesResolver
  },
  Mutation: {
    courses: rebuildCoursesResolver
  }
};