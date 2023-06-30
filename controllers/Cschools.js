const { query } = require('express')
const productModel = require('../models/schema')

const getSchools = async (req,res) => {
    try {
        const schools = await productModel.find({})
        res.send({schools})
    } catch (error) {
        console.log(error)
    }
}

// const getAllProductsStatic = async (req,res) => {
//     try {
//         const products = await productModel.find().sort('name price')
//         res.status(200).json({products, numHits: products.length})
//     } catch (error) {
//         console.log(error)
//     }
// }

// const getAllProducts = async (req,res) => {
//     const {company, featured, name, sort, fields, numericFilters} = req.query
//     const queryObject = {}
//     if(featured){
//         queryObject.featured = featured === 'true' ? true : false
//     }
//     if(company){
//         queryObject.company = company
//     }
//     if(name){
//         queryObject.name = {$regex: name, $options: 'i'}
//     }
    
//     if(numericFilters){
//         const operatorMap = {
//             '>': '$gt',
//             '>=': '$gte',
//             '<': '$lt',
//             '<=': '$lte',
//             '=': '$eq'
//         }
//         const regEx  = /\b<|>|>=|<=|=\b/g
//         let filters = numericFilters.replace(regEx, (item)=>`-${operatorMap[item]}-`)
//         const options = ['price','rating']
//         filter = filters.split(',').forEach((item)=>{
//             const [field, operator, value] = item.split("-")
//             if(options.includes(field)){
//                 queryObject[field] = {[operator]: Number(value)}
//             }
//         })
//     }

//     console.log(queryObject)
//     let result = productModel.find(queryObject)
    
//     if(sort){
//         const sortList = sort.split(',').join(" ")
//         result = result.sort(sortList)
//     } else{ 
//         result = result.sort('createdAt')
//     }

//     if(fields){
//         const fieldsList = fields.split(',').join(" ")
//         result = result.select(fieldsList)
//     }

//     // const page = Number(req.query.page) || 1
//     // const limit = Number(req.query.limit) || 15
//     // const skip = (page-1) * limit

//     // result = result.skip(skip).limit(limit)

//     try {
//         const products = await result
//         res.status(200).json({products})
//     } catch (error) {
//         console.log(error)
//     }
// }


module.exports = {getSchools}