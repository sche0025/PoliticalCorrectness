let mongoose = require('mongoose')

mongoose.connect('mongodb+srv://chen:123@nlptest-r26bl.gcp.mongodb.net/test?retryWrites=true')
// mongoose.connect('mongodb://admin:12345678@203.101.224.144/admin')

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