const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser')
const customerRoute = require('./routes/customer')
const PORT = process.env.PORT || 3000;

const logger = (req,res,next) =>{
    console.log('hello');
    next()
}


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

app.use(customerRoute)

// app.use((req, res, next) => {
//     res.status(404).send('We think you are lost!')
// })

app.get('/', (req, res) => {
   res.send('welcome')
})


app.listen(PORT, () => {
    console.log('server running');
});