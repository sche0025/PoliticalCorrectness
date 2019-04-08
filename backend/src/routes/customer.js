let CustomerModel = require('../models/customerModel')
let express = require('express')
let router = express.Router()



// router.get('/customer/insert', (req, res) => {
// //     // res.send('welcome customer')
// //     if (!req.body) {
// //         return res.status(400).send('body missing')
// //     }
// //
// //     let user = {
// //         name: "test chen",
// //         email: '123@gmail.com',
// //         age:99
// //     }
// //
// //     let customer = new CustomerModel(user)
// //
// //     //
// //     customer.save()
// //         .then(doc => {
// //
// //             res.status(201).send(doc,'saved')
// //         })
// //         .catch(err => {
// //                 res.status(500).json(err)
// //             }
// //         )
// // })

router.post('/customer',(req,res) =>{
 let newCustomer = CustomerModel();
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