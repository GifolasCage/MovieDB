var createError = require('http-errors');
var express = require('express');
var path = require('path');
var passport = require('passport')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var configurePassport = require('./scripts/passportconfig');
const dbConnection = require('./scripts/database');
var flash = require('connect-flash');
require('dotenv').config();

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var tableviewRouter = require('./routes/tableview');
var logoutRouter = require('./routes/logout');
var searchRouter = require('./routes/search');
var posterViewRouter = require('./routes/posterview');
var accountSettingsRouter = require('./routes/accountsettings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/scripts'));

var store = new MongoDBStore({
  uri: process.env.DB_URL,
  databaseName: process.env.DB_NAME,
  collection: 'mySessions'
});

app.use(session({
  secret: process.env.SECRET_KEY,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

  
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/tableview', tableviewRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/search', searchRouter);
app.use('/posterview', posterViewRouter);
app.use('/accountsettings', accountSettingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
