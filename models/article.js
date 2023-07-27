const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  text: {
    type: String,
    // required: true,
    minlength: 2
  },
  img: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    // required: true,
    minlength: 2,
  },
  tag: {
    type: String,
    // enum: ['комедия', 'драма', 'боевик', 'триллер', 'документальный'],
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

module.exports = mongoose.model('article', articleSchema);
