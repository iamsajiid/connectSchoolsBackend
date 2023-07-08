const express = require('express')
const router = express.Router()
const {getAllSchools, getSchool} = require('../controllers/Cschools')

router.get('/getAllSchools', getAllSchools)
router.get('/getSchool/:id', getSchool)

module.exports = router