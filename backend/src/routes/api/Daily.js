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
        .then((data)=>{
            // res.send(data)
            globalData = data
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.get('/daily/find', (req, res) => {

    console.log('wow')
    DailyModel.find(
        { date: "Apr-13-2019"}
    )
        .then((data)=>{
            res.send(data)
            console.log(data)
            // globalData = data
        })
        .catch((err)=>{
            console.log(err);
        })
})


router.get('/daily/test', (req, res) => {
    res.send(globalData)
    console.log(globalData)

})


module.exports = router