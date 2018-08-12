var personalmessageSchema= require('../models/personalmessageSchema');
var User = require('../models/userModel');
var aesjs = require('./aesjs.js');


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
      personalmessageModel.find({groupname:params.room},(err,doc)=>{
        if(err){
          console.log('An error in the old message service');
        }
        else if(doc)
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

        // var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
        // var textBytes = aesjs.utils.utf8.toBytes(message.text);
        // var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
        // var encryptedBytes = aesCtr.encrypt(textBytes);
        //  message.text = aesjs.utils.hex.fromBytes(encryptedBytes);
var msg=new personalmessageSchema({chatname:message.room,text:message.text,sender: message.sender});
console.log('Hello I am here');
console.log(msg);
//newly added
// var names=users.GetUsersList(message.room);
// if(names.length!=2){
//   var notisentto;
//   if(names[0]==message.sender)
//   {
//     notisentto=names[1];
//   }
//   else{
//     notisentto= names[0];
//   }
//   var notiInsert = {name: message.sender,text: message.text,gettingid=message.room,groupornot:false};
//   User.find({username:notisentto})
//   .then((user)=>{
//     user[0].notification.append(notiInsert);
//     user[0].save((err,doc)=>{
//       if(err)
//       console.log('error in sending noti the message');
//       else {
//         console.log('Succesfully sent the noti to database');
//       }
//     })
//   })
//
// }//Uptill here

msg.save((err,doc)=>{
  if(err)
  console.log('error in saving the message');
  else {
    console.log('Succesfully sent the message in the database');
  }
})
        callback();
    });

    socket.on('disconnect',()=>{
      var user=users.RemoveUser(socket.id);

      if(user){
        io.to(user.room).emit('usersList',users.GetUsersList(params.room));

      }
    })

  });

}
