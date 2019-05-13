let DailyModel = require('../../models/dailyModel')
let express = require('express')
let router = express.Router()
// let test = require( '../../../public/assets/jsonformatter')

var globalData = []

// GET

router.get('/daily/retrieve', (req, res) => {

    // console.log('wow')
    DailyModel.find(
        {}
    )
        .then((data) => {
            // res.send(data)
            globalData = data
        })
        .catch((err) => {
            console.log(err);
        })
})

router.get('/daily/find', (req, res) => {

    console.log('wow')
    DailyModel.find(
        {}
        // {}, {'Top_Tags_of_Politicians.date':"Apr-14-2019"}
    )
        .then((data) => {
            res.send(data)
            // console.log(data)
            // globalData = data
        })
        .catch((err) => {
            console.log(err);
        })
})


router.get('/toptags/:date', (req, res) => {

    console.log(req.params.date)
    var searchDate = req.params.date

    DailyModel.find(
        {}, {
            Top_Tags_of_Politicians: {$elemMatch: {date: searchDate}},
            Top_Tags_of_Users: {$elemMatch: {date: searchDate}}
        }
        // {}, {'Top_Tags_of_Politicians.date':"Apr-14-2019"}
    )
        .then((data) => {
            console.log(JSON.parse(JSON.stringify(data[0])).Top_Tags_of_Politicians[0].data)

            res.send({
                p_tag:JSON.parse(JSON.stringify(data[0])).Top_Tags_of_Politicians[0].data,
                u_tag:JSON.parse(JSON.stringify(data[0])).Top_Tags_of_Users[0].data
            })
            // console.log(data)
            // globalData = data
        })
        .catch((err) => {
            console.log(err);
        })

})


module.exports = router