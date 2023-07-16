const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 10
  },
  email: {
    type: String,
    required: true,
    format: 'email'
  },
  passwordHash: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  district: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  marksFromTest: {
    type: Number,
    min: 0,
    max: 100
  }
});

module.exports = mongoose.model('User', userSchema);