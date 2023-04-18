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
  if(req.user){
    try {
      if (!db) {
        throw new Error('Database connection is not established');
      }
  
      const series = await db.collection(req.user.email).find({type: "series"}).toArray();
      res.render('series', { title: 'Favorite Series', series: series, user: req.user});
    } catch (error) {
      console.log('Error while fetching favorite movies:', error);
      res.render('series', { title: 'Error fetching favorite movies', user: req.user});
    }
  }else{
    res.redirect('/login');
  }
  });

module.exports = router;