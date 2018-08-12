var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport =  require('passport');
const socketIO = require('socket.io');
var authenticate = require('./authenticate');
const {Users} = require('./helpers/UsersClass');

var registerRouter = require('./routes/register');
var index = require('./routes/index');
var users = require('./routes/users');
var group = require('./routes/groups');
var login = require('./routes/login');
var personal = require('./routes/personal');
var notification =require('./routes/notificationRequest');
var prompt = require('./routes/prompts');


const url = 'mongodb://localhost:27017/TejasProject2';
const connect = mongoose.connect(url, {
    useMongoClient: true,
    /* other options */
  });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();

// app.all('*', (req, res, next) => {
//   if (req.secure) {
//     return next();
//   }
//   else {
//     res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//   }
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);
app.use('/group', group);
app.use('/register',registerRouter);
app.use('/login',login);
app.use('/personalchat',personal);
app.use('/notification',notification);
app.use('/prompt', prompt);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // res.redirect('/login');
  next(err);
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
