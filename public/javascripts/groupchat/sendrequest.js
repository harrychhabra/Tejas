$(document).ready(function(){
  var socket = io();

  var room = $('#groupname').val();
  var sender= $('#sender').val();

  socket.on('connect', function(){
      var params = {
           sender: sender
      }

      socket.emit('joinRequest', params, function(){
        console.log('Joined');
      });
  });

  socket.on('newFriendRequest', function(friend){
    console.log(friend);
  });

    $('#add_friend').on('submit', function(e){
        e.preventDefault();

        var receiverName = $('#receiverName').val();

        // socket.emit('friendRequest', {
        //   receiver: receiverName,
        //   sender: sender
        // }, function(){
        //   console.log('Request Sent');
        // })

        $.ajax({
          url: '/group/'+room,
          type: 'POST',
          data: {
            receiverName: receiverName
          },
          success: function(){
            socket.emit('friendRequest', {
              receiver: receiverName,
              sender: sender
            }, function(){
              console.log('Request Sent');
            })
          }
        })
    });
});
