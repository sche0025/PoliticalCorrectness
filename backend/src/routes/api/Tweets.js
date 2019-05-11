let TweetsModel = require('../../models/tweetsModel')
let express = require('express')
let router = express.Router()
let test = require('../../../public/assets/jsonformatter')
let parser = require( '../../utils/dataParser')

// GET
router.get('/tweets/find', (req, res) => {

    // console.log('wow')
    TweetsModel.find(
        {}
    )
        .then((data) => {
            res.send(data)
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


    TweetsModel.find({date: searchDate})
        .then((data) => {
            if (data) {
                console.log("searchDate", searchDate)
                var leaderBoardData = parser.getLeaderboardData(data)

                res.send(leaderBoardData)

            } else {
                console.log("no data exist for this id");
            }
        })
        .catch((err) => {
            console.log(err);
        });

})

//get data for politicians
router.get('/getpoliticiansdata/:date', (req, res) => {
    console.log(req.params.date)
    var searchDate = req.params.date


    TweetsModel.find({date: searchDate})
        .then((data) => {
            if (data) {
                console.log("searchDate", searchDate)
                var leaderBoardData = parser.getPoliticiansData(data)

                res.send(leaderBoardData)

            } else {
                console.log("no data exist for this id");
            }
        })
        .catch((err) => {
            console.log(err);
        });

})

module.exports = router