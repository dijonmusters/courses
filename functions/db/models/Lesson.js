const mongoose = require('mongoose');

const Download = {
  title: String,
  url: String
}

const schema = {
  courseCode: String,
  moduleName: String,
  title: String,
  body: String,
  slug: String,
  videoUrl: String,
  downloads: [Download]
};

module.exports = mongoose.model('Lesson', schema);