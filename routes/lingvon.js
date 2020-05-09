const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.json({
    status: true
}));

router.get('/:id', (req, res) => {
    res.json({
        id: req.params.id
    })
})


router.post('/', (req, res) => res.json(members));

module.exports = router