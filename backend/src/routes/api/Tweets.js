let TweetsModel = require('../../models/tweetsModel')
let express = require('express')
let router = express.Router()
let test = require('../../../public/assets/jsonformatter')
let parser = require('../../utils/dataParser')

// // find all tweets
// router.get('/tweets/find', (req, res) => {
//
//     TweetsModel.find(
//         {}
//     )
//         .then((data) => {
//             res.send(data)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })
//
// // find all politicians
// router.get('/politicians/find', (req, res) => {
//
//     TweetsModel.find(
//         {}
//     )
//         .then((data) => {
//             res.send(data)
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

router.get('/tweets/test1/:date', (req, res) => {
    console.log(req.params.date)
    var searchDate = req.params.date


    TweetsModel.find(
        {date: searchDate}, {"data.sumPolitician": 1}
    )
        .then((data) => {

            res.send(
                // JSON.parse(JSON.stringify(data[0])).sumPolitician[0].data
                data
            )
        })
        .catch((err) => {
            console.log(err);
        })
})

router.get('/tweets/mapreduce', (req, res) => {

    var o = {}
    o.map = function () {
        emit(this.Screen_Name, this.Retweets)
    }

    o.reduce = function (k, v) {
        return Array.sum(v)
    }

    // console.log('wow')
    TweetsModel.mapReduce(o, function (err, results) {
        if (err) throw err;
        console.log(results)
    });

})

router.post('/tweets/insert', (req, res) => {
    console.log(req.body)
    TweetsModel.create(req.body)
        .then((docs) => {
            if (docs) {
                res.send('delete success');
            } else {
                reject({"success": false});
            }
        }).catch((err) => {
        reject(err);
    })
})

//find based on criteria
router.get('/tweets/findone', (req, res) => {

    TweetsModel.find({age: 25})
        .then((doc) => {
            if (doc) {
                res.send(doc)
            } else {
                console.log("no data exist for this id");
            }
        })
        .catch((err) => {
            console.log(err);
        });
})

//get data for leaderboard
router.get('/getleaderboarddata/:date', (req, res) => {
    console.log(req.params.date)
    var searchDate = req.params.date


    TweetsModel.find(
        // {}, {sumPolitician: {$elemMatch: {date: searchDate}}}
        {date: searchDate}, {"data.sumPolitician": 1}
    )
        .then((data) => {
            if (true) {
                console.log("getleaderboarddata", searchDate)
                // console.log("getleaderboarddata", data)

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
    console.log(req.params.date)
    var searchDate = req.params.date


    TweetsModel.find(
        {date: searchDate}, {"data.sumPolitician": 1}
        // {}, {sumPolitician: {$elemMatch: {date: searchDate}}}

    )
        .then((data) => {
            if (JSON.parse(JSON.stringify(data[0])).data.sumPolitician) {
                console.log("searchDate", searchDate)
                // var politiciansData = parser.getPoliticiansData(
                //     JSON.parse(JSON.stringify(data[0])).sumPolitician[0].data
                // )

                // res.send(JSON.parse(JSON.stringify(data[0])).sumPolitician[0].data)
                // res.send(  JSON.parse(JSON.stringify(data[0])).sumPolitician[0].data)
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
    console.log(req.params.date)
    var searchDate = req.params.date


    TweetsModel.find(
        // {}, {sumParty: {$elemMatch: {date: searchDate}}}
        {date: searchDate}, {"data.sumParty": 1}
    )
        .then((data) => {
            // res.send(data)

            if (JSON.parse(JSON.stringify(data[0])).data.sumParty) {
                console.log("searchDate", searchDate)

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
    console.log(req.params.date)
    var searchDate = req.params.date


    TweetsModel.find(
        // {}, {sumPolitician: {$elemMatch: {date: searchDate}}}
        {date: searchDate}, {"data.sumPolitician": 1}
    )
        .then((data) => {
            if (true) {
                console.log("searchDate", searchDate)
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
    console.log(req.params.date)
    var searchDate = req.params.date


    TweetsModel.find(
        // {}, {sumParty: {$elemMatch: {date: searchDate}}}
        {date: searchDate}, {"data.sumParty": 1}
    )
        .then((data) => {
            // res.send(data)

            if (JSON.parse(JSON.stringify(data[0])).data.sumParty) {
                console.log("searchDate", searchDate)
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
    console.log(searchDate, partyName)
    // {date: searchDate,"data.sumPolitician.Party":"Australian Greens"},
    // {"data.sumPolitician.$":1}
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