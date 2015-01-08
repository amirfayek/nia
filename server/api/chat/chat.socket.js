/**
 * Broadcast updates to client when the model changes
 */

'use strict';
// var User = require('../user/user.model')
var Chat = require('./chat.model');
var io = require('socket.io').listen(8000);

var users = [];
var messages = [];


io.sockets.on('connection', function (socket) {


  socket.on('say', function (message) {
      // console.log("socket.on('say')")
      messages.push(message);
      // console.log("socket_id:", socket.id)
      io.sockets.emit('said', message);
  });

  socket.on('loadusers', function (user) {
    // console.log("load!")
    // console.log(user)
    users.push(user);
    // console.log(users)
    io.sockets.emit('loaded', user)
  });
  
  socket.on('disconnect', function(){  
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

