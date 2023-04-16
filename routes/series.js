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
  
      const series = await db.collection('series').find({}).toArray();
      res.render('series', { title: 'Favorite Series', series: series });
    } catch (error) {
      console.log('Error while fetching favorite movies:', error);
      res.render('series', { title: 'Error fetching favorite movies' });
    }
  });

module.exports = router;