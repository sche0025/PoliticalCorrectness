let TweetsModel = require('../../models/tweetsModel')
let express = require('express')
let router = express.Router()
let test = require( '../../../public/assets/jsonformatter')


// GET
router.get('/tweets/find', (req, res) => {

    // console.log('wow')
    TweetsModel.find()
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.log(err);
        })
})


router.get('/tweets/mapreduce', (req, res) => {

    var o = {}
    o.map = function (){
        emit(this.Screen_Name,this.Retweets)
    }

    o.reduce = function(k,v){
        return Array.sum(v)
    }

    // console.log('wow')
    TweetsModel.mapReduce(o, function (err, results) {
        if(err) throw err;
        console.log(results)
    });

})

router.post('/tweets/insert',(req,res) =>{
    console.log(req.body)
    TweetsModel.create(req.body)
        .then((docs)=>{
            if(docs) {
                res.send('delete success');
            } else {
                reject({"success":false});
            }
        }).catch((err)=>{
        reject(err);
    })
})

//find based on criteria
router.get('/tweets/findone', (req, res) => {

    TweetsModel.find({ age:25 })
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

//test
router.get('/geojson', (req, res) => {

    TweetsModel.find({ age:25 })
        .then((doc) => {
            if (doc) {
                res.send(test)
            } else {
                console.log("no data exist for this id");
            }
        })
        .catch((err) => {
            console.log(err);
        });
})

module.exports = router