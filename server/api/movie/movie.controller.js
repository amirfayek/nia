'use strict';

// Third party modules
var underscore  = require('underscore'),
        request = require('request'),
              _ = require('lodash');

// Models
var Movie          = require('./movie.model');

// Custom modules
var rottenTomatoes = require('../../components/rottentomatoes'),
      canistreamit = require('../../components/canistreamit');

exports.index = function(req, res) {
  // request('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json?apikey=' + process.env.ROTTEN_TOMATOES_SECRET).pipe(res)
  rottenTomatoes.topMovies()
    .done(function(data) {
      return res.json(data);
    })
};

exports.show = function(req, res) {
  var movieTitle = req.params.id;
  var movieInfo = {};
  var rotten_tomatoes = {};
  var rottenTomatoesURL;
  var rottenTomatoesTitle;
  var regex = /.*m\/(.+)\//;

  var movieBasicInfo =
    // Get basic movie information from canistreamit
    canistreamit.searchByTitle(movieTitle)
      .then(function(data) {
        movieInfo = JSON.parse(data)[0];
        // Store canistreamit id to access streaming information
        var dataID = movieInfo._id;
        return dataID;
    }).then(function(id) {
        rottenTomatoesURL = movieInfo.links.rottentomatoes;
        // Store rotten tomatoes title from url
        rottenTomatoesTitle = regex.exec(rottenTomatoesURL)[1].replace(/_/g, " ");
        // Get canistreamit streaming information using data we stored
        return canistreamit.searchByID(id)
    }).then(function(data) {
        movieInfo = underscore.extend(movieInfo, JSON.parse(data));
        return rottenTomatoesTitle;
    }).then(function(rottenTomatoesTitle) {
        return rottenTomatoes.searchByTitle(rottenTomatoesTitle)
    }).then(function(data) {
        rotten_tomatoes.
        movieInfo = underscore.extend(movieInfo, JSON.parse(data));
    }).done(function() {
        return res.json(movieInfo);
    });
};

// Creates a new movie in the DB.
exports.create = function(req, res) {
  Movie.create(req.body, function(err, movie) {
    if(err) { return handleError(res, err); }
    return res.json(201, movie);
  });
};

// Updates an existing movie in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Movie.findById(req.params.id, function (err, movie) {
    if (err) { return handleError(res, err); }
    if(!movie) { return res.send(404); }
    var updated = _.merge(movie, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, movie);
    });
  });
};

// Deletes a movie from the DB.
exports.destroy = function(req, res) {
  Movie.findById(req.params.id, function (err, movie) {
    if(err) { return handleError(res, err); }
    if(!movie) { return res.send(404); }
    movie.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
