var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

const apikey = process.env.API_KEY;

router.get('/:id', (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=${apikey}&t=${req.params.id}`)
        .then((response) => {
            console.log(response.data);
            res.render('search', {data: response.data, user: req.user, searchText: req.params.id});
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post('/', (req, res) => {
    const data = req.body;
    console.log(data);
    res.redirect(`/search/${data.search}`);
});

module.exports = router;