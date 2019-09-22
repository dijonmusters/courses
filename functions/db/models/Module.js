const mongoose = require('mongoose');
const Lesson = mongoose.model('Lesson').schema;

const schema = {
  name: String,
  lessons: [Lesson]
};

module.exports = mongoose.model('Module', schema);