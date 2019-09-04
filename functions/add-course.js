require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const connectDb = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
    console.log('connected to mongo db');
  } catch(error) {
    console.log(error);
  }
}

exports.handler = async (event, context, callback) => {
  await connectDb();
  const course = new Course({
    code: 'test0001',
    title: 'Intro to Test'
  });
  await course.save();
  callback(null, {
    statusCode: 200,
    body: 'Saved course'
  });
}