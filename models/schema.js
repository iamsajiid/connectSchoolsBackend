const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('schools', productSchema)


// name:{
//     type: String,
//     required: [true, 'needs to be filled']
// },
// price:{
//     type: Number,
//     required: [true, 'needs to be filled']
// },
// featured:{
//     type: Boolean,
//     default: false
// },
// rating:{
//     type: Number,
//     default: 4.5
// },
// createdAt:{
//     type: Date,
//     default: Date.now()
// },
// company:{
//     type: String,
//     enum:{
//         values: ['ikea', 'liddy', 'caressa', 'marcos'],
//         message: '{VALUE} is not supported'
//     }
// }