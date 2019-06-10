let mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://chen:123@nlptest-r26bl.gcp.mongodb.net/test?retryWrites=true')
// var db = mongoose.connect('mongodb://chen:123@115.146.85.107/test', { useNewUrlParser: true })
var db = mongoose.connect('mongodb://chen:123@103.6.254.48/test', { useNewUrlParser: true })

let TweetsSchema = new mongoose.Schema({
    // name:String,
    // email:{
    //     type:String,
    //     require:true,
    //     unique:true
    // },
    // age:Number

})

// module.exports = mongoose.model('Tweet',TweetsSchema,'sumHead')
module.exports = mongoose.model('Tweet',TweetsSchema,'sumTest')