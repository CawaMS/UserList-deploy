<<<<<<< HEAD
var morgan = require('morgan');
var winston = require('./config/winston');

=======
const tracer = require('dd-trace').init();
>>>>>>> efd9469b613e46002f0df24d0920f389c477c0f4
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
<<<<<<< HEAD
var logger = require('morgan');

// 	Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.db);
=======
//var logger = require('morgan');
var morgan = require('morgan');
var winston = require('./config/winston');

require('dotenv').config({path: __dirname + '/.env'});
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(process.env.db);
db.addMiddleware(require('monk-middleware-debug'));

>>>>>>> efd9469b613e46002f0df24d0920f389c477c0f4
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
<<<<<<< HEAD
=======
//adding some comments for dummy check in
>>>>>>> efd9469b613e46002f0df24d0920f389c477c0f4

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

<<<<<<< HEAD
app.use(morgan('combined', { stream: winston.stream }));

=======
//app.use(logger('dev'));
app.use(morgan('combined', { stream: winston.stream }));
>>>>>>> efd9469b613e46002f0df24d0920f389c477c0f4
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
=======
console.log(process.env.FOO);

>>>>>>> efd9469b613e46002f0df24d0920f389c477c0f4
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

<<<<<<< HEAD
=======

>>>>>>> efd9469b613e46002f0df24d0920f389c477c0f4
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
