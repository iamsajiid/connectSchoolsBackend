const express = require('express')
const router = express.Router()
const {getAllSchools, compareSchools, getSchool, autoComplete, createAccount, logIn, addSchool} = require('../controllers/Cschools')

router.get('/recommendation', (req, res) => {
    const axios = requier('axios')
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
  
  // Show response data
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
})

router.get('/getallschools', getAllSchools)
router.get('/getschool/:id', getSchool)
router.get('/compareSchools', compareSchools)
router.get('/autocomplete', autoComplete)
router.post('/createaccount', createAccount)
router.post('/login', logIn)
router.post('/addSchool', addSchool)

module.exports = router

