$(document).ready(function(){
  var socket = io();

  var room = $('#chat_id').val();
  var sender= $('#sender').val();

  socket.on('oldMessage',function(oldmessage){
    var template = $('#message-template').html();
    for(var i=0;i<oldmessage.length;i++){
    var message = Mustache.render(template,{
      text :oldmessage[i].text,
      sender: oldmessage[i].sender
      });
    $('#messages').append(message);
    document.getElementById('chat_personal').scrollTop=document.getElementById('chat_personal').scrollHeight;
    }
  });

  socket.on('connect', function(){
    console.log('yea! User connected');

    var params = {
      room: room,
      name: sender
    }
    socket.emit('join',params,function(){
      console.log('User has successfully joined this channel');
    });
  });

  socket.on('usersList',function(users){
    var ol = $('<ol></ol');

    for( var i=0;i<users.length; i++){
        ol.append('<p style="color:#00A0B0;">'+users[i]+'</p>');
    }


    $('#numValue').text('('+users.length+')');
    $('#users').html(ol);

  });


  socket.on('newMessage', function(data){
    console.log(data);
    var template = $('#message-template').html();
    var message = Mustache.render(template,{
      text :data.text,
      sender: data.from
    });
    $('#messages').append(message);
    document.getElementById('chat_personal').scrollTop=document.getElementById('chat_personal').scrollHeight;
  });

  //to prevent
  $('#message-form').on('submit', function(e){
    e.preventDefault();

    var msg = $('#msg').val();

    socket.emit('createMessage', {
      text : msg,
      room : room,
      sender : sender
    },function(){
      $('#msg').val('');
    });
  });
})
