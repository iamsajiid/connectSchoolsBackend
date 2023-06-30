const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Add this line for the _id field
    name: { type: String, required: true },
    address: String,
    city: String,
    postalCode: String,
    state: String,
    website: { type: String, match: /^https?:\/\//i },
    email: { type: String, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
    phoneNumber: String,
    board: String,
    fee: {
      minimum: { type: Number, min: 0 },
      maximum: { type: Number, min: 0 }
    },
    googleMap: { type: String, match: /^https?:\/\//i },
    overview: String,
    "school photo urls" : [String] // Changed to an array of strings for photo URLs
  });
  
  const School = mongoose.model('schools', schoolSchema);
  
  module.exports = School;
  



  