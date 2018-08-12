var messageModel= require('../models/messageModel');
var group = require('../models/meetingSchema');
var User = require('../models/userModel');
var personalmessageSchema= require('../models/personalmessageSchema');
var personal = require('../models/personalChatSchema');
// var aesjs = require('./aesjs.js');

var socket_id;
module.exports = function (io, Users) {

  const users =  new Users();

  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('join',(params,callback)=>{
      socket.join(params.room);

      //For Getting the old messages


      users.AddUserData(socket.id,params.name,params.room);
      console.log(users);
      console.log(socket.id);
      messageModel.find({groupname:params.room},(err,doc)=>{
        if(err){
          console.log('An error in the old message service');
        }
        else if(doc.length==0)
        {
          console.log('I am in here');
          personalmessageSchema.find({chatname:params.room},(err,doc)=>{
            if(err)
            {
              console.log('Truly an Error');
            }
            else {
              console.log(doc);
              io.to(socket.id).emit('oldMessage',doc);
            }
          })
        }
        else
        {
          console.log(params);
          console.log('Succesful in retrieving the old messages');
          console.log(doc);

          // var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
          // for(var i=0; i<doc.length; i++)
          // {
          //   var encryptedBytes = aesjs.utils.hex.toBytes(doc[i].text);
          //   var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
          //   var decryptedBytes = aesCtr.decrypt(encryptedBytes);
          //   doc[i].text = aesjs.utils.utf8.fromBytes(decryptedBytes);
          // }

          io.to(socket.id).emit('oldMessage',doc);
        }
      })
      io.to(params.room).emit('usersList',users.GetUsersList(params.room));

      callback();
    })

    socket.on('createMessage', (message,callback) => {
      console.log(message);
        io.to(message.room).emit('newMessage', {
          text : message.text,
          room : message.room,
          from : message.sender
        });

      //   var msg;
      //   var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
      // var textBytes = aesjs.utils.utf8.toBytes(message.text);
      // var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
      // var encryptedBytes = aesCtr.encrypt(textBytes);
      //  message.text = aesjs.utils.hex.fromBytes(encryptedBytes);

      group.find({_id:message.room})
      .then((meet)=>{
        if(meet.length==0)
        {
          msg=new personalmessageSchema({chatname:message.room,text:message.text,sender: message.sender});
          msg.save((err,doc)=>{
            if(err)
            console.log('error in saving the message');
            else {
              console.log('Succesfully sent the message in the personal message database');
            }
          })
          //newly added
          var notisentto;
          var names=users.GetUsersList(message.room);
          if(names.length!=2){
            console.log('inside if statement');
          personal.find({_id:message.room})
          .then((chat)=>{
            console.log('In here');
            console.log('chat\n'+chat);
            console.log(chat[0].user1);
            console.log(chat[0].user1[0].name);
            if(chat[0].user1[0].name==message.sender)
            {
              console.log('In if');
              notisentto=chat[0].user2[0].name;
            }
            else {
              console.log('In else');
              notisentto = chat[0].user1[0].name;
            }
            console.log(notisentto);
            var notiInsert = {name: message.sender,text: message.text,gettingid:message.room,groupornot:false};
            User.find({username:notisentto})
            .then((user)=>{
              console.log('inder this one\n'+user);
              console.log(user);

              User.findByIdAndUpdate(user[0]._id,{
                $push: { notification:notiInsert}
              }, {'new': true}, function(err) {
                console.log('done');
              })
              // user[0].notification.push(notiInsert);
              // user[0].save((err,doc)=>{
              //   if(err)
              //   console.log('error in sending noti the message');
              //   else {
              //     console.log('document\n'+doc);
              //     console.log('Succesfully sent the noti to database');
              //   }
              })
          })

          }
          //Uptill here
        }
        else {
          msg=new messageModel({groupname:message.room,text:message.text,sender: message.sender});
          msg.save((err,doc)=>{
            if(err)
            console.log('error in saving the message');
            else {
              console.log('Succesfully sent the message in the group database');
            }
          })
          //From Here the code has been added
          var names=users.GetUsersList(message.room);

            group.find({_id:message.room})
              .then((meet)=>{
                console.log('in here is the error\n'+meet);
                for(var j=0;j<meet[0].users.length;j++)
                {
                  var flag=0;
                  var use=meet[0].users[j].user_id;//This is the id and not the username
                  User.find({_id:use})
                  .then((user)=>{
                    console.log('user\n'+user);
                  for(var i=0;i<names.length;i++)
                  {
                    if(user[0].username==names[i])
                    {
                      console.log(user[0].username+' is online');
                      flag=1;
                      break;
                    }
                  }
                  if(flag==0)
                  {
                    console.log('In Flag==0');
                    console.log(user);
                    var notiInsert = {name:meet[0].username,text:message.text,gettingid: message.room,groupornot: true}
                    console.log(user[0].username+' is not online and thence the noti is being updated');
                    console.log(notiInsert);
                    User.findByIdAndUpdate(user[0]._id,{
                      $push: { notification:notiInsert}
                    }, {'new': true}, function(err) {
                      console.log('done');
                    }) //Here shall be the notification object
                  }
                })
                }
              })
          //Uptill here the code has been added
        }
      })

// group.find({_id:message.room})
// .then((meet)=>{
//   var notification = new notification({name:meet[0].username,text:message.text,gettingid:meet[0]._id,groupornot:true});
//
// })

//From Here the code has been added
// var names=users.GetUsersList(message.room);
//
//   group.find({_id:message.room})
//     .then((meet)=>{
//       for(var j=0;j<meet[0].users.length;j++)
//       {
//         var flag=0;
//         var use=meet[0].users[j];//This is the id and not the username
//         User.find({_id:use})
//         .then((user)=>{
//         for(var i=0;i<names.length;i++)
//         {
//           if(user.username==names[i])
//           {
//             console.log(user.username+' is online');
//             flag=1;
//             break;
//           }
//         }
//         if(flag==0)
//         {
//           var notiInsert = {name:meet.username,text:message.text,gettingid: message.room,groupornot: true}
//           console.log(user.username+' is not online and thence the noti is being updated');
//           User.findByIdAndUpdate(user._id,{
//             $push: { notification:notiInsert}
//           }, {'new': true}, function(err) {
//             console.log('done');
//           })//Here shall be the notification object
//         }
//       })
//       }
//     })
//Uptill here the code has been added



        callback();
    });

    socket.on('disconnect',()=>{
      var user=users.RemoveUser(socket.id);

      if(user){
        io.to(user.room).emit('usersList',users.GetUsersList(user.room));

      }
    })

  });

}
