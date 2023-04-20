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

router.get('/:id', async function(req, res, next) {
  if(req.user){
    try {
      if (!db) {
        throw new Error('Database connection is not established');
      }
      
      //render tableview for favourite movies.
      if(req.params.id === 'movies'){
        const movies = await db.collection(req.user.email).find({type:"movie"}).toArray();
        res.render('tableview', { title: 'Favorite Movies', data: movies, user: req.user });
        //render tableview for favourite series.
      }else if(req.params.id === 'series'){
        const series = await db.collection(req.user.email).find({type:"series"}).toArray();
        res.render('tableview', { title: 'Favorite Series', data: series, user: req.user });
      }else{
        res.send('404......');
      }
    } catch (error) {
      console.log('Error while fetching favourites', error);
      res.render('tableview', { title: 'Error fetching favourites', user: req.user });
    }
  }
  else{
    res.redirect('/login');
  }
});

module.exports = router;