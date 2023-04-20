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

router.get('/:id', async (req,res)=>{
    if(req.user){
        try {
          if (!db) {
            throw new Error('Database connection is not established');
          }

          if(req.params.id === 'movies'){
            const movies = await db.collection(req.user.email).find({type:"movie"}).toArray();
            res.render('posterview', {title: 'Poster View Movies', data: movies, user: req.user });
          }else if(req.params.id === 'series'){
            const series = await db.collection(req.user.email).find({type:"series"}).toArray();
            res.render('posterview', {title: 'Poster View Series', data: series, user: req.user });
          }else{
            res.send('404....')
          }
        } catch (error) {
          console.log('Error while fetching favourites:', error);
          res.render('posterview', { title: 'Poster View',user: req.user });
        }
      }
      else{
        res.redirect('/login');
      }
});

module.exports = router;