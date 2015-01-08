'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ToprentalSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Toprental', ToprentalSchema);