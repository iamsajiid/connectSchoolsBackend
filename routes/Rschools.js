const express = require('express')
const router = express.Router()
const {getAllSchools, getSchool, autoComplete, createAccount, logIn} = require('../controllers/Cschools')

router.get('/getallschools', getAllSchools)
router.get('/getschool/:id', getSchool)
router.get('/autocomplete', autoComplete)
router.post('/createaccount', createAccount)
router.post('/login', logIn)

module.exports = router