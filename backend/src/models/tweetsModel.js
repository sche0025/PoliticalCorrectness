let mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://chen:123@nlptest-r26bl.gcp.mongodb.net/test?retryWrites=true')
var db = mongoose.connect('mongodb://admin:123@115.146.85.107/admin', { useNewUrlParser: true })
// console.log("db:")
let TweetsSchema = new mongoose.Schema({
    // name:String,
    // email:{
    //     type:String,
    //     require:true,
    //     unique:true
    // },
    // age:Number

})

module.exports = mongoose.model('Tweet',TweetsSchema,'Tweets')