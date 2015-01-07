/**
 * Broadcast updates to client when the model changes
 */

'use strict';
// var User = require('../user/user.model')
var Chat = require('./chat.model');
var io = require('socket.io').listen(8000);

var users = {};
var messages = [];


io.sockets.on('connection', function (socket) {
  
  socket.on('sign-in', function (name) {
    console.log("signed in")
    
    socket.emit('load', users, messages);
    
    io.sockets.emit('signed-in', name);
    
    // var user_hash = {socket_id: socket.id, name: name};

    users[socket.id] = {
      name: name
    }

    console.log(users)
    

  });

  socket.on('say', function (message) {
    messages.push(message);

    io.sockets.emit('said', message);
  });

  socket.on('disconnect', function(){
    console.log("disconnect")
    console.log("users")
    console.log(users)
    
    delete users[socket.id]
    console.log("users after delete")
    console.log(users)
  });
});


console.log('Listening on port 8000...')

exports.register = function(socket) {
  Chat.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Chat.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

