const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser')
// const customerRoute = require('./routes/api/customer')
const tweetsRoute = require('./routes/api/tweets')
const dailyRoute = require('./routes/api/daily')
const PORT = process.env.PORT || 3001;

const logger = (req,res,next) =>{
    console.log('hello');
    next()
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use((req,res,next) =>{
//     console.log('received')
//     next()
// })

// app.use(bodyparser.json);
app.use(bodyparser.json())
// app.use((req, res, next) => {
//     console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
//     next()
// })

// app.use('/api',customerRoute)
app.use('/api',tweetsRoute)
app.use('/api',dailyRoute)
// app.use((req, res, next) => {
//     res.status(404).send('We think you are lost!')
// })
//
// app.get('/api/', (req, res) => {
//    //  var data = {name:'edward'}
//    // res.send(data)
// })


app.listen(PORT, () => {
    console.log('server running');
});