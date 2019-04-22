let CustomerModel = require('../../models/customerModel')
let express = require('express')
let router = express.Router()


router.post('/customer/insert',(req,res) =>{
    console.log(req.body)
    CustomerModel.create(req.body)
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

router.get('/customer/removeone', (req, res) => {

        CustomerModel.findOneAndRemove({age:99})
            .then((docs)=>{
                if(docs) {
                    res.send('delete success');
                } else {
                    reject({"success":false,data:"no such user exist"});
                }
            }).catch((err)=>{
            reject(err);
        })

})


// GET
router.get('/customer/find', (req, res) => {

    CustomerModel.find({})
        .then((data)=>{
           res.send(data)
        })
        .catch((err)=>{
            console.log(err);
        })
})

//find based on criteria
router.get('/customer/findone', (req, res) => {

    CustomerModel.find({ age:25 })
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

module.exports = router