var express = require('express');
var promptRouter = express.Router();
var bodyParser = require('body-parser');
// var passport=require('passport');
var User = require('../models/userModel');


promptRouter.post('/send/:userId', function(req, res, next) {

  var i=0;

  User.findByIdAndUpdate(req.params.userId, {
    $push: { promptRequest:{name: req.body.name, user_id: req.body.user_id, message: req.body.message}}
  }, {'new': true}, function(err) {
    console.log('done');
    i++;
  })

  User.findById(req.params.userId)
  .then((user) => {
    User.findByIdAndUpdate(req.body.user_id, {
      $push: { promptRequest:{name: user.username, user_id: req.params.userId, message: req.body.message}}
    }, {'new': true}, function(err) {
      console.log('done');
      i++;
    })
  })

   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.json({status: true, message: 'prompt sent successfully'});

});

promptRouter.get('/:userId', function(req, res, next) {
  User.findById(req.params.userId)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: 'received', prompts: user.promptRequest});
  })
});

promptRouter.put('/accept/:userId', function(req, res, next) {
  User.findById(req.body.userId)
  .then((user) => {
    // console.log('user.body.userId', req.body.userId);
    // console.log('user.body', req.body);
    // if(user != null && user.promptRequest.id(req.params.userId) != null) {
    //   console.log(user.promptRequest.user_id(req.params.userId));
    //   console.log(user.promptRequest.user_id(req.params.userId));
    //   user.promptRequest.user_id(req.params.userId).status = true;
    // console.log('user.promptRequest.user_id(req.params.userId).status ', user.promptRequest.user_id(req.params.userId).status);
      // user.promptRequest.user_id(req.params.userId).status = true;
    // }
    var array = user.promptRequest;
    for(var i=0; i<array.length; i++)
    {
      if(array[i].user_id == req.params.userId)
      {
        array[i].status = true;
      }
    }

    user.save()
    .then((user) => {
      User.findById(req.params.userId)
      .then((user) => {
        // console.log('user.body.userId', req.body.userId);
        // console.log('user.body', req.body);
        // if(user != null && user.promptRequest.id(req.params.userId) != null) {
        //   console.log(user.promptRequest.user_id(req.params.userId));
        //   console.log(user.promptRequest.user_id(req.params.userId));
        //   user.promptRequest.user_id(req.params.userId).status = true;
        // console.log('user.promptRequest.user_id(req.params.userId).status ', user.promptRequest.user_id(req.params.userId).status);
          // user.promptRequest.user_id(req.params.userId).status = true;
        // }
        array = user.promptRequest;
        for(var i=0; i<array.length; i++)
        {
          if(array[i].user_id == req.body.userId)
          {
            array[i].status = true;
          }
        }

        user.save()
        .then((user) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({status: 'success', message: 'prompt changed correctly'});
        })
      })
    })
  })
})



module.exports = promptRouter;
