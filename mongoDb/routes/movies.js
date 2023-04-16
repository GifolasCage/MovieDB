var express = require('express');
var router = express.Router();
var connectToDB = require('../scripts/database');

let db;

(async () => {
  try {
    db = await connectToDB();
  } catch (error) {
    console.log('Error while connecting to the database:', error);
  }
})();

router.get('/', async function(req, res, next) {
    try {
      if (!db) {
        throw new Error('Database connection is not established');
      }
  
      const movies = await db.collection('movies').find({}).toArray();
      res.render('movies', { title: 'Favorite Movies', movies: movies });
    } catch (error) {
      console.log('Error while fetching favorite movies:', error);
      res.render('movies', { title: 'Error fetching favorite movies' });
    }
});

module.exports = router;