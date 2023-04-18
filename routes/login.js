const express = require('express');
const router = express.Router();
const passport = require('passport');
const configurePassport = require('../scripts/passportconfig');

configurePassport(passport);

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user){
    res.redirect('/');
  }else{
    res.render('login', { user: req.user });
  }
});

router.post('/authenticate', passport.authenticate('local', {
  successRedirect: '/', // Redirect to the main page upon successful login
  failureRedirect: '/login', // Redirect back to the login page upon failed login
  failureFlash: true // Set to 'true' to enable flash messages for login failures
}));

module.exports = router;
