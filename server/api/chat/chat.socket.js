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
  
  socket.on('sign-in', function (name) {
    console.log("signed in")
    // var socket_id = socket.id
    socket.emit('load', users, messages);
    
    io.sockets.emit('signed-in', name);
    // users.push(name);
    
    //this logs a string of characters
    // console.log(socket_id)
    
    //this pops out {socket_id: "Joey"} if i put Joey in the input field
    var user_hash = {socket_id: socket.id, name: name};

    // users.push(user_hash);

    console.log(user_hash)

    //any time i try to put in socket.id as a key in a hash it just throws an error and trying to store it in a variable simply puts the name of the variable


  });

  socket.on('say', function (message) {
    messages.push(message);

    io.sockets.emit('said', message);
  });

  socket.on('disconnect', function(){
    console.log("users")
    console.log(users)
    console.log("socket_id")
    console.log(socket.id)
    console.log("users[socket.id]")
    console.log(users[socket.id])
    
    delete users[socket.id]
    
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

