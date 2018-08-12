var express = require('express');
var groupRouter = express.Router();
var authenticate= require('../authenticate');
var bodyParser = require('body-parser');
var passport=require('passport');
var Meeting = require('../models/meetingSchema');
var User = require('../models/userModel');

/* GET home page. */

groupRouter.get('/:user_id/:groupid', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.redirect('../group.html');
  console.log(req.params.user_id);
  console.log(req.params.groupid);
  Meeting.findById(req.params.groupid)
  .then((meet)=>{
    console.log(meet);
    User.find({_id :req.params.user_id})
    .then((user)=>{
      console.log(user);
      res.render('group.ejs', {title: 'group', user: user[0].username, groupname: meet.username,group_id: req.params.groupid});
    })
  })

});

groupRouter.get('/hello/allgroups/:user_id',function(req,res,next){
  console.log('Inside this req');
  console.log(req.params.user_id);
  User.find({_id:req.params.user_id})
  .then((user)=>{
    console.log(user);
    var requiredInfo = user[0].groupChatAssociated;
    console.log(requiredInfo);
    var final=[];
    var len=requiredInfo.length;
    for(var i=0;i<len;i++)
    {
      console.log(i);
      console.log("reached in here");
      var j=0;
      Meeting.find({_id:requiredInfo[i].GCA_id})
      .then((meet)=>{
        console.log('I am in  teh meeting');
        console.log(meet);
        // console.log(requiredInfo[i]);
        // (requiredInfo[i])["meetingname"]=meet.username;
        final.push(meet[0]);
        console.log('This is final');
        console.log(final);
        if(j===(i-1))
        {
          console.log(final);
          j++;
          res.statusCode=200;
          res.setHeader('Content-Type', 'application/json');
          res.json(final);
        }
        else {
          {
            j++;
            console.log(i);
            console.log('This is the else condition');
          }
        }
      })
      console.log('I have reached the ned of the fpor loop');
    }
  })
})


// groupRouter.get('/:groupid', function(req, res, next) {
//   //res.render('index', { title: 'Express' });
//   //res.redirect('../group.html');
//   // console.log(req.user._id);
//   // User.find({_id :req.user._id})
//   // .then((user)=>{
//   //   console.log(user);
//     res.render('group.ejs',  {title: 'group', groupname: req.params.groupid});
//   // })
// });

groupRouter.post('/', function(req, res, next) {

  console.log(req.body);
  var y;
  Meeting.create(req.body)
    .then((meeting) => {
        console.log('Meeting Created ', meeting);
        y = meeting._id;
        console.log(y);
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json(meeting);
        array = req.body.users;
        console.log(array);
        for(user in array)
        {
          console.log(array[user].user_id);
          User.findByIdAndUpdate(array[user].user_id, {
            $push: { groupChatAssociated:{GCA_id: y}}
          }, {'new': true}, function(err) {
            console.log('done');
          });
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: true, groupid: y});
});

});


module.exports = groupRouter;
