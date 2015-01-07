/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Toprental = require('./toprental.model');

exports.register = function(socket) {
  Toprental.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Toprental.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('toprental:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('toprental:remove', doc);
}