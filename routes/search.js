var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/:id', (req, res) => {
    axios.get(``)
});

router.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.redirect(`/search/${data.search}`);
});

module.exports = router;