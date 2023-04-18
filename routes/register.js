const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const dbConnection = require('../scripts/database');
const configurePassport = require('../scripts/passportconfig');

configurePassport(passport);

router.get('/', function (req, res, next) {
    if(req.user){
        res.redirect('/');
    }else{
        res.render('register', {user: req.user });
    }
});

router.post('/adduser', async (req, res) => {
  const { email, password } = req.body;
  const db = await dbConnection();
  const usersCollection = db.collection('users');

  if(email === '' || password === ''){
    return res.status(400).send('Missing username or password');
  }

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).send('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
  };

  try {
    await usersCollection.insertOne(newUser);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding user to database');
  }
});

module.exports = router;