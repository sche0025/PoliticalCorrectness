let parser = require('../../utils/dataParser')

let DailyModel = require('../../models/dailyModel')
let express = require('express')
let router = express.Router()
// let test = require( '../../../public/assets/jsonformatter')

// var globalData = []
//
// // GET
//
// router.get('/daily/retrieve', (req, res) => {
//
//     // console.log('wow')
//     DailyModel.find(
//         {        "date": {$in: ["Apr-13-2019", "Apr-14-2019"]}
//         }
//     )
//         .then((data) => {
//             // res.send(data)
//             globalData = data
//             res.send(data)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })
//
// router.get('/daily/find', (req, res) => {
//
//     DailyModel.find(
//         {
//             "date": {$in: ["Apr-13-2019", "Apr-14-2019"]}
//         }, {
//
//         },
//     )
//         .then((data) => {
//             res.send(data)
//             // console.log(data)
//             // globalData = data
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

//get data for leaderboard line chart
router.post('/daily/getleaderboardlinechartdata/', (req, res) => {

    DailyModel.find(
        {"date": {$in: req.body}}, {
            "date": 1,
            "data.dailyPolitician.Mentioned_Count": 1,
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

// get politician line chart (receive)
router.post('/daily/getpoliticianlinechartreceive/', (req, res) => {

    var dateList = req.body.dateList
    var partyName = req.body.party
    DailyModel.aggregate(
        [
            { "$match": { "data.dailyParty.Party": partyName,"date":{$in:dateList }} },
            { "$unwind": "$data" },
            { "$unwind": "$date" },
            { "$unwind": "$data.dailyParty" },
            { "$match": { "data.dailyParty.Party": partyName } },
            { "$group": {
                    "_id": {
                        "_id": "$_id",
                        "storeId": "$data._id",
                        "date":"$date"
                    },

                    "dailyParty": { "$push": "$data.dailyParty" }
                }},
            { "$group": {
                    "_id": "$_id._id",

                    "data": {
                        "$push": {
                            "date":"$_id.date",
                            "_id": "$_id.storeId",
                            "dailyParty": "$dailyParty"
                        }
                    }
                }}
        ]

    )
        .then((data) => {
            // res.send(data)
            var resultList = parser.getPartyDaily(data,dateList)

            res.send(resultList)
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        })
})

// get politician line chart (post)
router.post('/daily/getpoliticianlinechartpost/', (req, res) => {

    var dateList = req.body.dateList
    var politicianID = req.body.politicianID
    DailyModel.aggregate(
        [
            { "$match": { "data.dailyPolitician.ID": politicianID,"date":{$in:dateList }} },
            { "$unwind": "$data" },
            { "$unwind": "$date" },
            { "$unwind": "$data.dailyPolitician" },
            { "$match": { "data.dailyPolitician.ID": politicianID } },
            { "$group": {
                    "_id": {
                        "_id": "$_id",
                        "storeId": "$data._id",
                        "date":"$date"
                    },

                    "dailyPolitician": { "$push": "$data.dailyPolitician" }
                }},
            { "$group": {
                    "_id": "$_id._id",
                    "data": {
                        "$push": {
                            "date":"$_id.date",
                            "_id": "$_id.storeId",
                            "dailyPolitician": "$dailyPolitician"
                        }
                    }
                }}
        ]

    )
        .then((data) => {
            var resultList = parser.getPoliticianDaily(data,dateList)
            res.send(resultList)
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        })
})


//get data for trending topics
router.get('/toptags/:date', (req, res) => {

    var searchDate = req.params.date

    DailyModel.find(
        {"date": searchDate}, {"data.Top_Tags_of_Politicians": 1, "data.Top_Tags_of_Users": 1}
    )
        .then((data) => {
            if (JSON.parse(JSON.stringify(data[0])).data.Top_Tags_of_Politicians) {


                res.send({
                    p_tag: JSON.parse(JSON.stringify(data[0])).data.Top_Tags_of_Politicians,
                    u_tag: JSON.parse(JSON.stringify(data[0])).data.Top_Tags_of_Users
                })
            } else {
                console.log("no data exist for this id");
                res.send([])
            }

        })
        .catch((err) => {
            console.log(err);
            res.send([])
        })

})

//get data for line chart in politicians' page
router.post('/daily/getpoliticianlinechart/', (req, res) => {

    var dateList = req.body.dateList
    var politicianID = req.body.politicianID
    DailyModel.aggregate(
        [
            { "$match": { "data.dailyPolitician.ID": politicianID,"date":{$in:dateList }} },
            { "$unwind": "$data" },
            { "$unwind": "$date" },
            { "$unwind": "$data.dailyPolitician" },
            { "$match": { "data.dailyPolitician.ID": politicianID } },
            { "$group": {
                    "_id": {
                        "_id": "$_id",
                        "storeId": "$data._id",
                        "date":"$date"
                    },

                    "dailyPolitician": { "$push": "$data.dailyPolitician" }
                }},
            { "$group": {
                    "_id": "$_id._id",

                    "data": {
                        "$push": {
                            "date":"$_id.date",
                            "_id": "$_id.storeId",
                            "dailyPolitician": "$dailyPolitician"
                        }
                    }
                }}
        ]

    )
        .then((data) => {
            // res.send(data)
            var resultList = parser.getPoliticianDaily(data,dateList)
            res.send(resultList)
            // res.send(resultList)
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        })
})

//get data for line chart in parties' page
router.post('/daily/getPartylinechart/', (req, res) => {
    var dateList = req.body.dateList
    var partyName = req.body.party
    DailyModel.aggregate(
        [
            { "$match": { "data.dailyParty.Party": partyName,"date":{$in:dateList }} },
            { "$unwind": "$data" },
            { "$unwind": "$date" },
            { "$unwind": "$data.dailyParty" },
            { "$match": { "data.dailyParty.Party": partyName } },
            { "$group": {
                    "_id": {
                        "_id": "$_id",
                        "storeId": "$data._id",
                        "date":"$date"
                    },

                    "dailyParty": { "$push": "$data.dailyParty" }
                }},
            { "$group": {
                    "_id": "$_id._id",

                    "data": {
                        "$push": {
                            "date":"$_id.date",
                            "_id": "$_id.storeId",
                            "dailyParty": "$dailyParty"
                        }
                    }
                }}
        ]

    )
        .then((data) => {
            // res.send(data)
            var resultList = parser.getPartyDaily(data,dateList)

            res.send(resultList)
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        })
})

module.exports = router