'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
    favorites: Number
  }
});

module.exports = mongoose.model('Movie', MovieSchema);