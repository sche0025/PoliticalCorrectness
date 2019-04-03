let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://chen:123@nlptest-r26bl.gcp.mongodb.net/test?retryWrites=true')

let CustomerSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        require:true,
        unique:true
    },
    age:Number

})

module.exports = mongoose.model('customer',CustomerSchema)