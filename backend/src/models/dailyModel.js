let mongoose = require('mongoose')


// var db = mongoose.connect('mongodb://chen:123@115.146.85.107/test', { useNewUrlParser: true })
var db = mongoose.connect('mongodb://chen:123@103.6.254.48/test', { useNewUrlParser: true })

let DailySchema = new mongoose.Schema({

})

// module.exports = mongoose.model('daily',DailySchema,'dailyHead')
module.exports = mongoose.model('daily',DailySchema,'dailyTest')