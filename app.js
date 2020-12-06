'use strict';
var debug = require('debug');
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const MongoClient = require('mongodb').MongoClient;
const MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
/**
 * Mondo DB connection setup
 */
// uri to connect to the mongo db.
const uri = "mongodb+srv://inder:inder@cluster0.qhdsc.mongodb.net/<dbname>?retryWrites=true&w=majority";

//try to Connect database
try {
  mongoose.connect(uri, {
    useNewUrlParser: true
  });
  var db = mongoose.connection;
  db.on('error', function (err) {
    console.log(err);
  });
  db.once('open', function (callback) {
    console.log('MongoDB connection established...');
  });
  // catch error and show to the console if there is any
} catch (err) {
  console.log("Error Message: " + err);
}
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
