const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const dbConnection = require('../scripts/database');
const configurePassport = require('../scripts/passportconfig');
const { ObjectId } = require('mongodb');

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
    name: "",
    view: "tableview"
  };

  try {
    await usersCollection.insertOne(newUser);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding user to database');
  }
});

router.post('/edituser', async (req, res) => {
  const { id, email, name, view, password, bio } = req.body;
  const db = await dbConnection();
  const usersCollection = db.collection('users');

  if (!id || email === '') {
    return res.status(400).send('Missing user ID or email');
  }

  const updateQuery = {
    $set: {
      email,
      name,
      view,
      bio
    }
  };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateQuery.$set.password = hashedPassword;
  }

  try {
    await usersCollection.updateOne({ _id: new ObjectId(id) }, updateQuery);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error updating user');
  }
});
module.exports = router;