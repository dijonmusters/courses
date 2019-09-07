const mongoose = require('mongoose');

const Download = {
  title: String,
  url: String
}

const schema = {
  code: String,
  title: String,
  videoUrl: String,
  downloads: [Download],
  body: String
};

module.exports = mongoose.model('Course', schema);