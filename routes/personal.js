var express = require('express');
var personalRouter = express.Router();
var authenticate= require('../authenticate');
var bodyParser = require('body-parser');
var passport=require('passport');
var personalChat = require('../models/personalChatSchema');
var User = require('../models/userModel');

// personalRouter.post('/',function(req,res,next){
//   console.log(req.body);
//   personalChat.create(req.body)
//   .then((chat)=>{
//     console.log('Chat Created',chat);
//     var chat_id=chat[0]._id;
//     console.log(chat_id);
//     console.log(req.body.user1[0].user_id);
//     User.findByIdAndUpdate(req.body.user1[0].user_id,{
//       $push:{personalChatAssociated:{PCA_id:chat_id}}
//     },{'new':true},function(err){
//       console.log('done');
//     });
//     User.findByIdAndUpdate(req.body.user2[0].user_id,{
//       $push:{personalChatAssociated:{PCA_id:chat_id}}
//     },{'new':true},function(err){
//       console.log('done');
//     });
//   res.statusCode=200;
//   res.setHeader('Content-Type','application/json');
//   res.json({status:true,chatid:chat_id});
// });
// });

personalRouter.post('/:userid', function(req, res, next) {
  var y;
  console.log(req.body);
  personalChat.create(req.body)
  .then((chat) => {
    console.log('Chat created');
    console.log(chat);
    y=chat._id;
    console.log(req.body);
    array = req.body;
    console.log(array);
    console.log(array.user1[0].user_id, ' y ', y);
    User.findByIdAndUpdate(array.user1[0].user_id, {
      $push: { personalChatAssociated: {PCA_id: y}}
    }, {'new': true}, function(err) {
      console.log('done');
    });

    User.findByIdAndUpdate(array.user2[0].user_id, {
      $push: { personalChatAssociated: {PCA_id: y}}
    }, {'new': true}, function(err) {
      console.log('done');
    });


    // for(user of array)
    // {
    //   console.log(user.user_id);
    //   User.findByIdAndUpdate(user.user_id, {
    //     $push: { personalChatAssociated: {PCA_id: y}}
    //   }, {'new': true}, function(err) {
    //     console.log('done');
    //   });
    // }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: true, chatid: y});
  });
});


personalRouter.get('/:user_id/:chatid', function(req, res, next) {
  personalChat.findById(req.params.chatid)
  .then((chat) => {
    console.log('chat', chat);
    var id;
    if(req.params.chatid != chat.user1[0].user_id) {
        id = chat.user2[0].user_id;
        console.log('id ', id);
    }
    else {
      id = chat.user1[0].user_id;
      console.log('id', id);
    }

    User.findById(req.params.user_id)
    .then((user) => {
      console.log('user', user);
      User.findById(id)
      .then((secuser) => {
        console.log('secuser', secuser);
        res.render('personal.ejs', {title: 'chat', user: user.username, groupname: secuser.username,chat_id: req.params.chatid});
      })
    })
  })
});

personalRouter.get('/getlist/chats/:user_id', function(req, res, next){
  User.findById(req.params.user_id)
  .then((user) => {
    console.log('user', user);
    var requiredInfo = user.personalChatAssociated;
    console.log('requiredInfo', requiredInfo);
    var final = [];
    var len = requiredInfo.length;
    console.log(len);
    for(var i=0; i<len; i++)
    {
      var j=0;
      personalChat.findById(requiredInfo[i].PCA_id)
      .then((chat) => {
        console.log('chat', chat);
        final.push(chat);
        if(j===(i-1))
        {
          j++;
          console.log('in if loop');
          res.statusCode=200;
          res.setHeader('Content-Type', 'application/json');
          console.log('final', final);
          res.json(final);
        }
        else {
          j++;
        }
      })
    }
  })
})

module.exports=personalRouter;
