const bcrypt = require("bcrypt");
const users = require("../models/userAccountSchema");
const schools = require('../models/schema')

const getAllSchools = async (req,res) => {
    const {name, address, zip, state, board, numericFilters, sort, fields} = req.query
    const queryObject = {}
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if(address){
        queryObject.address = {$regex: address, $options:'i'}
    }
    if(state){
        queryObject.state = {$regex: state, $options:'i'}
    }
    if(board){
        queryObject.board = {$regex: board, $options:'i'}
    }
    if(zip){
        queryObject.zip = Number(zip)
    }
    
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq'
        }
        const regEx  = /\b<|>|>=|<=|=\b/g
        let filters = numericFilters.replace(regEx, (item)=>`-${operatorMap[item]}-`)
        const options = ['fee structure minimum','fee structure maximum']
        filter = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split("-")
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        })
    }

    console.log(queryObject)
    let result = schools.find(queryObject)
    
    if(sort){
        const sortList = sort.split(',').join(" ")
        result = result.sort(sortList)
    } else{ 
        result = result.sort('name')
    }

    if(fields){
        const fieldsList = fields.split(',').join(" ")
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit

    result = result.skip(skip).limit(limit)

    try {
        const school = await result
        res.status(200).json({nHits: school.length, school})
    } catch (error) {
        console.log(error)
    }
}

const getSchool = async (req, res) => {
    try {
      const { id: schoolID } = req.params;
      const school = await schools.findOne({ _id: schoolID });
      if (!school) {
        return res.status(404).json(`task not found with ID: ${schoolID}`);
      }
      res.status(201).json({ nHits: school.length, school });
    } catch (error) {
      // console.log(error);
      res.status(500).json({ msg: error });
    }
  }

const autoComplete = async(req,res)=>{
    const {search} = req.query
    const regEx = new RegExp(`^${search}`, 'i')
    try{
        const suggestions = await schools.find({name: regEx}).limit(10)
        res.status(201).json(suggestions.map((suggests)=> suggests.name))
    } catch(error){
        res.status(500).json({msg: error})
    }
  }

const saltRounds = 10;

const checkIfUserExists = async (username) => {
  let users1 = await users.find({ username: username });
  // consopple.log(users1);
  // console.log(users1.length);
  if (users1.length === 0) {
    return 0;
  }
  return 1;
};

// takes in a post request and creates an account based on the fields: name, email, passwordHash, grade, district, state, marksFromTest.
// Name, email, password hash are required
const createAccount = async (req, res) => {
  let {
    name,
    username,
    email,
    password,
    confirmPassword,
    grade,
    district,
    state,
    marksFromTest,
  } = req.body;
  console.log(req.body);
  if (await checkIfUserExists(username)) {
    return res.status(400).json({
      error: "username already exists",
    });
  }

  if (
    !name ||
    !email ||
    !password ||
    password != confirmPassword ||
    !grade ||
    !district ||
    !state ||
    !username
  ) {
    return res.status(400).json({
      error: "Please provide all required fields",
    });
  }
  let passwordHash;
  try {
    passwordHash = await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.log(err);
  }
  if (!marksFromTest) {
    marksFromTest = null;
  }
  console.log("creating new user");
  console.log(passwordHash);
  const newUser = await users.create({
    name,
    username,
    email,
    passwordHash,
    grade,
    district,
    state,
    marksFromTest,
  });

  res.json(newUser);
};

//check if the username and password is correct, if correct, sets the userrname of the user in session
const logIn = async (req, res) => {
  let { username, password } = req.body;
  console.log(req.body);
  if (await checkIfUserExists(username)) {
    //check the password and if it's correct, log the user in.
    let users1 = await users.find({ username: username });
    let storedHash;
    users1.forEach((user) => {
      storedHash = user.passwordHash;
      console.log('password is' + storedHash)
    });
    bcrypt.compare(password, storedHash, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return;
      } 
      if (result) {
        console.log("Passwords match!");
        try {
          req.session.user = { username: username };
          res.send('logged in!');
          console.log(req.session.user);
          console.log('lol')
        } catch (error)
        {
          console.log(error);
          console.log('Error setting session user');
          res.status(500).send("Internal Server Error");
        }

      } else {
        console.log("Passwords do not match!");
        return res.status(401).json({
          error: 'wrong password'
        });
      }
    });
  } else {
    return res.status(400).json({
      error: "invalid username",
    });
  }
};

module.exports = {getAllSchools, getSchool, autoComplete, createAccount, logIn}