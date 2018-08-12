module.exports = function(io){
  io.on('connection', (socket) => {
    socket.on('joinRequest', (myRequest, callback) => {
      socket.join(myRequest.sender);

      callback();
    });

    socket.on('friendRequest', (friend, callback) => {
      //newFriendRequest for real time notification
      io.to(friend.receiver).emit('newFriendRequest', {
        from: friend.sender,
        to: friend.receiver
      });

      callback();
    });
  });
}
