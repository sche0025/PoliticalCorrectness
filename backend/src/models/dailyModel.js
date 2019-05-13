let mongoose = require('mongoose')


var db = mongoose.connect('mongodb://chen:123@115.146.85.107/test', { useNewUrlParser: true })

let DailySchema = new mongoose.Schema({

})

module.exports = mongoose.model('daily',DailySchema,'daily')