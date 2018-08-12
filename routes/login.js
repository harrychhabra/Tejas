var express = require('express');
var loginRouter = express.Router();
var authenticate= require('../authenticate');
var bodyParser = require('body-parser');
var passport=require('passport');
var User = require('../models/userModel');
/* GET home page. */

loginRouter
.get('/', function(req, res, next) {
  res.redirect('/login.html');
})

.post('/checklogin', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.writeHead(200, {'Content-Type': 'application/json'});
  User.find({_id : req.user._id})
  .then((users)=>{

    res.end(JSON.stringify(users));

  })
});

module.exports = loginRouter;
