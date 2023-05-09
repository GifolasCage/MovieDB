var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();

var connectToDB = require('../scripts/database');
const apikey = process.env.API_KEY;

let db;

(async () => {
  try {
    db = await connectToDB();
  } catch (error) {
    console.log('Error while connecting to the database:', error);
  }
})();

router.get('/', (req, res) =>{
    res.send("You must enter a search query...");
});

router.get('/:id', async (req, res) => {
    axios.get(`https://www.omdbapi.com/?apikey=${apikey}&t=${req.params.id}`)
        .then(async (response) => {
            console.log(response.data);
            let isFavourite = false;

            if (req.user) {
                try {
                    const movie = await db.collection(req.user.email).findOne({ imdbId: response.data.imdbID });
                    isFavourite = movie != null;
                } catch (error) {
                    console.log('Error while checking movie in the database:', error);
                }
            }

            res.render('search', {data: response.data, user: req.user, searchText: req.params.id, isFavourite});
        })
        .catch((error) => {
            console.log(error);
        });
});


router.post('/', (req, res) => {
    const data = req.body;
    res.redirect(`/search/${data.search}`);
});

module.exports = router;