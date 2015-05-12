'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var MovieSchema = new Schema({
  _id: String,
  updated: { type: Date, default: Date.now},
  title: String,
  year: Number,
  desc: String,
  img: String,
  actors: [{ name: String }],
  ratings: Number,
  active: Boolean,
  date: [{ type: Date, default: Date.now}],
  meta: {
    favorites: [ {type : mongoose.Schema.ObjectId, ref : 'User'} ]
  }
});

module.exports = mongoose.model('Movie', MovieSchema);