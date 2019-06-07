let TweetsModel = require('../../models/tweetsModel')
let express = require('express')
let router = express.Router()
let parser = require('../../utils/dataParser')

//
// router.get('/tweets/test1/:date', (req, res) => {
//     console.log(req.params.date)
//     var searchDate = req.params.date
//
//
//     TweetsModel.find(
//         {date: searchDate}, {"data.sumPolitician": 1}
//     )
//         .then((data) => {
//
//             res.send(
//                 data
//             )
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })
//
// router.get('/tweets/mapreduce', (req, res) => {
//
//     var o = {}
//     o.map = function () {
//         emit(this.Screen_Name, this.Retweets)
//     }
//
//     o.reduce = function (k, v) {
//         return Array.sum(v)
//     }
//
//     // console.log('wow')
//     TweetsModel.mapReduce(o, function (err, results) {
//         if (err) throw err;
//         console.log(results)
//     });
//
// })
//
// router.post('/tweets/insert', (req, res) => {
//
//     TweetsModel.create(req.body)
//         .then((docs) => {
//             if (docs) {
//                 res.send('delete success');
//             } else {
//                 reject({"success": false});
//             }
//         }).catch((err) => {
//         reject(err);
//     })
// })
//
// //find based on criteria
// router.get('/tweets/findone', (req, res) => {
//
//     TweetsModel.find({age: 25})
//         .then((doc) => {
//             if (doc) {
//                 res.send(doc)
//             } else {
//                 console.log("no data exist for this id");
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

//get data for leaderboard
router.get('/getleaderboarddata/:date', (req, res) => {
    var searchDate = req.params.date


    TweetsModel.find(
        {date: searchDate}, {"data.sumPolitician": 1}
    )
        .then((data) => {
            if (true) {


                var leaderBoardData = parser.getLeaderboardData(
                    JSON.parse(JSON.stringify(data[0])).data.sumPolitician
                )

                res.send(leaderBoardData)

            } else {
                console.log("no data exist for this id-leaderboard");
                res.send([])
            }
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        });

})

//get data for politicians
router.get('/getpoliticiansdata/:date', (req, res) => {
    var searchDate = req.params.date


    TweetsModel.find(
        {date: searchDate}, {"data.sumPolitician": 1}

    )
        .then((data) => {
            if (JSON.parse(JSON.stringify(data[0])).data.sumPolitician) {
                res.send(JSON.parse(JSON.stringify(data[0])).data.sumPolitician)

            } else {
                console.log("no data exist for this id -  politiciandata");
                res.send([])
            }
        })
        .catch((err) => {
            res.send([])
            console.log(err);
        });

})

//get data for politicians
router.get('/getpartydata/:date', (req, res) => {
    // console.log(req.params.date)
    var searchDate = req.params.date


    TweetsModel.find(
        {date: searchDate}, {"data.sumParty": 1}
    )
        .then((data) => {

            if (JSON.parse(JSON.stringify(data[0])).data.sumParty) {


                res.send(JSON.parse(JSON.stringify(data[0])).data.sumParty)

            } else {
                console.log("no data exist for this id - partydata");
                res.send([])
            }
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        });

})

//get data for dashboardDonut
router.get('/dashboardDonut/:date', (req, res) => {

    var searchDate = req.params.date


    TweetsModel.find(
        {date: searchDate}, {"data.sumPolitician": 1}
    )
        .then((data) => {
            if (true) {

                var donutData = parser.getDonutData(
                    JSON.parse(JSON.stringify(data[0])).data.sumPolitician
                )

                res.send(donutData)

            } else {
                console.log("no data exist for this id -dashvoarddonut");
                res.send([])
            }
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        });

})

//get data for leaderboard-stack
router.get('/getleaderboardbarchartdata/:date', (req, res) => {

    var searchDate = req.params.date


    TweetsModel.find(
        {date: searchDate}, {"data.sumParty": 1}
    )
        .then((data) => {


            if (JSON.parse(JSON.stringify(data[0])).data.sumParty) {

                var sortedParty = parser.sortParty(JSON.parse(JSON.stringify(data[0])).data.sumParty)
                res.send(sortedParty)
                // res.send(JSON.parse(JSON.stringify(data[0])).data.sumParty)
            } else {
                console.log("no data exist for this id - getleaderboardbarchartdata");
                res.send([])
            }
        })
        .catch((err) => {
            console.log(err);
            res.send([])
        });

})

//get data for politicians
router.post('/getpartytopleaders/', (req, res) => {

    var searchDate = req.body.date
    var partyName = req.body.party


    TweetsModel.aggregate(
        [
            {"$match": {"data.sumPolitician.Party": partyName, "date": {$in: [searchDate]}}},
            {"$unwind": "$data"},
            {"$unwind": "$date"},
            {"$unwind": "$data.sumPolitician"},
            {"$match": {"data.sumPolitician.Party": partyName}},
            {
                "$group": {
                    "_id": {
                        "_id": "$_id",
                        "storeId": "$data._id",
                        "date": "$date"
                    },

                    "sumPolitician": {"$push": "$data.sumPolitician"}
                }
            },
            {
                "$group": {
                    "_id": "$_id._id",

                    "data": {
                        "$push": {
                            "date": "$_id.date",
                            "_id": "$_id.storeId",
                            "sumPolitician": "$sumPolitician"
                        }
                    }
                }
            }
        ]
    )
        .then((data) => {

            var resultList = parser.getPartyTopLeaders(data)
            res.send(resultList)
        })
        .catch((err) => {
            res.send([])
            console.log(err);
        });

})

module.exports = router