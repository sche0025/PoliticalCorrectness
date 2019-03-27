const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 5000;

const logger = (req,res,next) =>{
    console.log('hello');
    next()
}

app.use(logger);

app.use('/api/members',require('./routes/api/members'))


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/api/members/:id', (req, res) => {
  res.json(members.filter( member => req.params.id == member.id));
});




app.listen(PORT, () => {
    console.log('server running');
});