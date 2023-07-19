const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  
  strict : true,

  address: String,
  
  district: String,
  
  zip: Number,
  
  state: String,
  
  website: { 
    type: String,
    match: /^https?:\/\//i
  },
  
  email: {
    type: String,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  },
  
  phone: String,
  
  board: String,
  
  fee: {
      minimum: { type: Number, min: 0 },
      maximum: { type: Number, min: 0 }
  },
  
  "map location": String,
  
  overview: String,
  
  photo: [String],
  
  type: String,
  
  status: String,
  
  "coed status": String,
  
  established: String
});

module.exports = mongoose.model('schools', schoolSchema, 'test')