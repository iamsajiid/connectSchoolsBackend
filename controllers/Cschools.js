const schools = require('../models/schema')

const getAllSchools = async (req,res) => {
    const {name, address, zip, state, Board, numericFilters, sort, fields} = req.query
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
    if(Board){
        queryObject.Board = {$regex: Board, $options:'i'}
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

module.exports = {getAllSchools, getSchool}