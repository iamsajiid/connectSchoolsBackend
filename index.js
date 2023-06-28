const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://ConnectSchools:7UPYJ34g4xq8coA8@connectschools.cvofo90.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);




// const mongoose = require('mongoose');
const School = require('./Models/school');

// Connect to MongoDB

let uri = 'mongodb+srv://ConnectSchools:7UPYJ34g4xq8coA8@connectschools.cvofo90.mongodb.net/connectschools?retryWrites=true&w=majority';
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
    try {
        console.log(req.query)
        const schools = await School.find({district : req.query['district']}).limit(1);
        console.log(schools);
        res.send(schools);
      } catch (error) {
        console.error('Error retrieving schools:', error);
        res.status(500).send('Failed to retrieve schools');
      }
    });


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

