const express = require('express');
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

router.get('/movies', async (req,res)=>{
    if(req.user){
        try {
          if (!db) {
            throw new Error('Database connection is not established');
          }
      
          const movies = await db.collection(req.user.email).find({type:"movie"}).toArray();
          res.render('posterviews', {title: 'Poster View', data: movies, user: req.user });
        } catch (error) {
          console.log('Error while fetching favorite movies:', error);
          res.render('posterviews', { title: 'Poster View',user: req.user });
        }
      }
      else{
        res.redirect('/login');
      }
});

router.get('/series', async (req,res)=>{
  if(req.user){
      try {
        if (!db) {
          throw new Error('Database connection is not established');
        }
    
        const series = await db.collection(req.user.email).find({type:"series"}).toArray();
        res.render('posterviews', {title: 'Poster View', data: series, user: req.user });
      } catch (error) {
        console.log('Error while fetching favorite movies:', error);
        res.render('posterviews', { title: 'Poster View',user: req.user });
      }
    }
    else{
      res.redirect('/login');
    }
});


module.exports = router;