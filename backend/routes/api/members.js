const  express = require('express')
const  router = express.Router();

const members = [
    {
        id: 1,
        name: 'chen'
    },
    {
        id: 2,
        name: 'lee'
    }
]

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/:id', (req, res) => {
    res.json(members.filter( member => req.params.id == member.id));
});

module.exports = router