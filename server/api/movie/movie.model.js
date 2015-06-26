'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model');

var MovieSchema = new Schema({
  _id: String,
  updated: { type: Date, default: Date.now},
  title: String,
  year: Number,
  description: String,
  imgage: String,
  cast: [{ name: String }],
  ratings: Number,
  active: Boolean,
  date: [{ type: Date, default: Date.now}],
  providers: {
    rottenTomatoes: {
      ratings: {
        critics: { type: Number }, 
        audience: { type: Number }, 
      },
    },
    imdb: { 
      url: { type: String }
    },
    canIStreamIt: { 
      id: { type: String }
    },
    metaCritic: { type: String},
    netflix: {
      id: { type: String },
      url: { type: String },
      price: { type: Number }
    }
  },
  meta: {
    favorites: [ {type : mongoose.Schema.ObjectId, ref : 'User'} ]
  }
});

module.exports = mongoose.model('Movie', MovieSchema);