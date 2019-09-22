const { connectDb } = require('../db');

const coursesResolver = async (root, args, context) => {
  const { Course } = await connectDb();
  const courses = await Course.find();
  return courses;
}

const lessonResolver = async (root, args, context) => {
  const { lessonName } = args.input;
  const { Course, Lesson } = await connectDb();
  const course = await Course.findOne({ "modules.lessons.title": lessonName });
  console.log(JSON.stringify(course))
  const lessons = await Lesson.find();
  console.log(lessons)
  return course.modules[0].lessons[0];
}

const rebuildLessonsResolver = async (root, args, context) => {
  const { lessons } = args.input;
  const { Lesson } = await connectDb();
  await Lesson.deleteMany();
  await Lesson.insertMany(lessons);
  return lessons;
}

module.exports = {
  Query: {
    courses: coursesResolver,
    lesson: lessonResolver
  },
  Mutation: {
    lessons: rebuildLessonsResolver
  }
};