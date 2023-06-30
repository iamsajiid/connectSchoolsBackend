const express = require('express')
const router = express.Router()
const {getSchools} = require('../controllers/Cschools')

router.get('/hello', (req, res)=>{
    res.send('<h1>hello</h1>')
})
// router.get('/products', getAllProducts)
// router.get('/static', getAllProductsStatic)
router.get('/getSchools', getSchools)

module.exports = router