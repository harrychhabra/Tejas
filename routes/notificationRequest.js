const express = require('express');
const bodyParser = require('body-parser');
var passport=require('passport');
var User = require('../models/userModel');
var authenticate= require('../authenticate');
const notiRouter = express.Router();
notiRouter.use(bodyParser.json());

notiRouter.get('/:userid', function(req, res, next)
{
  console.log('In Notification Section');
  User.findOne({_id:req.params.userid})
  .then((user)=>{
    console.log(user);

    if(user.notification.length==0)
    {
      res.json({status: false});
    }
    else {
      var middle=[]
      for(var i=0;i<(user.notification).length;i++)
      {
        middle.push((user.notification)[i]);
      }
      console.log('middle',middle);
      // user.notification=[];
      // user.save((err,doc)=>{
      //   if(err)
      //   console.log('error in saving the message');
      //   else {
      //     console.log('Succesfully sent the message in the database');
      //   }
      // });
      console.log('NOtification:\n',middle);
      res.json({status:true,data: middle});
    }
  })

});


module.exports = notiRouter;
