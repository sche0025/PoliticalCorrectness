let parser = require('../../utils/dataParser')

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

    console.log(req.body)
    DailyModel.find(

        {
            "date": {$in: ["Apr-13-2019","Apr-14-2019" ]}},{
            "data.dailyPolitician.Sentiment_Pos":1,
            "data.dailyPolitician.Sentiment_Neu":1,
            "data.dailyPolitician.Sentiment_Neg":1
        },

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

router.post('/daily/getleaderboardlinechartdata/', (req, res) => {
    console.log("past 7 days:",req.body)

    DailyModel.find(


        {   "date": {$in: req.body}},{
            "date":1,
            "data.dailyPolitician.Sentiment_Pos":1,
            "data.dailyPolitician.Sentiment_Neu":1,
            "data.dailyPolitician.Sentiment_Neg":1
        },

    )
        .then((data) => {
            // res.send(data)
            var resultList = parser.getPastDaysTotal(data)
            res.send(resultList)
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        })
})


router.get('/toptags/:date', (req, res) => {

    console.log(req.params.date)
    var searchDate = req.params.date

    DailyModel.find(
        // {}, {Top_Tags_of_Politicians: {$elemMatch: {date: searchDate}}, Top_Tags_of_Users: {$elemMatch: {date: searchDate}}}
    {   "date": searchDate},{"data.Top_Tags_of_Politicians":1,"data.Top_Tags_of_Users":1}

    )
        .then((data) => {
            if(JSON.parse(JSON.stringify(data[0])).data.Top_Tags_of_Politicians){
                console.log(JSON.parse(JSON.stringify(data[0])).data.Top_Tags_of_Politicians)

                res.send({
                    p_tag:JSON.parse(JSON.stringify(data[0])).data.Top_Tags_of_Politicians,
                    u_tag:JSON.parse(JSON.stringify(data[0])).data.Top_Tags_of_Users
                })
            } else {
                console.log("no data exist for this id");
                res.send([])
            }

            // console.log(data)
            // globalData = data
        })
        .catch((err) => {
            console.log(err);

        })

})


module.exports = router