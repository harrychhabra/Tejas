const express = require('express');
const bodyParser = require('body-parser');
var passport=require('passport');
var User = require('../models/userModel');
var authenticate= require('../authenticate');
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter
.get('/',(req,res,next)=>{
  res.redirect('../register.html');
})

.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username,admin:req.body.admin,level1: req.body.level1,designation:req.body.designation,middlename:req.body.middlename,lastname:req.body.lastname,firstname:req.body.firstname,email:req.body.email}),
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      console.log('Reached IN here')
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

  module.exports = userRouter;
