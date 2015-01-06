/**
 * Broadcast updates to client when the model changes
 */

'use strict';
var User = require('../user/user.model')
var Chat = require('./chat.model');
var io = require('socket.io').listen(8000);

var users = [];
var messages = [];


io.sockets.on('connection', function (socket) {
  socket.on('sign-in', function (name) {
    socket.emit('load', users, messages);
    io.sockets.emit('signed-in', name);

    users.push(name);
  });

  socket.on('say', function (message) {
    messages.push(message);

    io.sockets.emit('said', message);
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

function onSave(socket, doc, cb) {
  socket.emit('chat:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('chat:remove', doc);
}