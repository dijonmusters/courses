const mongoose = require('mongoose');

const schema = {
  code: String,
  title: String,
  description: String,
  difficulty: String
};

module.exports = mongoose.model('Course', schema);