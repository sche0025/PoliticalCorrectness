let TweetsModel = require('../../models/tweetsModel')
let express = require('express')
let router = express.Router()
let test = require( '../../../public/assets/jsonformatter')


// GET
router.get('/tweets/find', (req, res) => {

    // console.log('wow')
    TweetsModel.find(
        // {In_Reply_to_Status_ID:"1115775761015640064"}
    )
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
router.get('/getleaderboarddata', (req, res) => {

  var
    data = [{
        key: '1',
        name: 'Scott Morrison',
        age: 32,
        tweetsCount: 2,
        party: 'labor',
        tt: 62,
        tr: 38,
        sc: "61/10/29",
        avatar: ('https://pbs.twimg.com/profile_images/1116081523394891776/AYnEcQnG_400x400.png')

    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        tweetsCount: 33,
        party: 'labor3'
        ,
        tt: 61,
        tr: 86,
        sc: "43/17/40",
        avatar: ('https://pbs.twimg.com/profile_images/1035037345588731909/i-QmXEp3_400x400.jpg')

    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        tweetsCount: 41,
        party: 'labor2'
        ,
        tt: 63,
        tr: 84,
        sc: "66/10/11",
        avatar: ('https://pbs.twimg.com/profile_images/645213958861811712/VHhqGqrQ_200x200.jpg')
    }, {
        key: '4',
        name: 'Jim Red',
        age: 32,
        tweetsCount: 35,
        party: 'labor1'
        ,
        tt: 69,
        tr: 85,
        sc: "33/30/34",
        avatar: ('https://pbs.twimg.com/profile_images/847583509757558784/V1l1tu2V_400x400.jpg')
    },
        {
            key: '5',
            name: 'Jim Red',
            age: 32,
            tweetsCount: 55,
            party: 'labor1'
            ,
            tt: 66,
            tr: 83,
            sc: "79/10/11",
            avatar: ('https://pbs.twimg.com/profile_images/750130479714545664/UZWiTi6v_400x400.jpg')
        }];

    res.send(data)

    // TweetsModel.find({ age:25 })
    //     .then((doc) => {
    //         if (doc) {
    //             res.send(test)
    //         } else {
    //             console.log("no data exist for this id");
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
})

module.exports = router