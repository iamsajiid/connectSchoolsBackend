const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const app = express()
const port = 3000

// const mongoose = require('mongoose');
const School = require('./Models/school');

// Connect to MongoDB

let uri = 'mongodb://127.0.0.1:27017/connectschools'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });



app.use(cors());

//routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getSchools', async (req, res) => {
    let query = req.query;
    console.log(query);
    let schools = await School.find().limit(100);
    res.send(schools);
})


// autocomplete API endpoint

// register user (normal user or school administration)

// login user

// add school (school admin account)

// update school

// compare school (takes a lists of schools, and returns all their data., min schools-2, max schools -3)

// get specific school information based on it's id


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

