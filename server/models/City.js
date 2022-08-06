const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String, 
    condition: String,
    conditionPic: String,
    temperature: Number
})

const City = mongoose.model("city", citySchema)
module.exports = City