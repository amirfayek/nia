'use strict';

var _ = require('lodash');
var underscore = require('underscore');
var request = require('request');
var url = require('url');
var Movie = require('./movie.model');
var rottenTomatoes = require('../../components/rottentomatoes');
var canistreamit = require('../../components/canistreamit');

exports.index = function(req, res) {
  request('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json?apikey=' + process.env.ROTTEN_TOMATOES_SECRET).pipe(res)
};

// Get list of movies
// exports.index = function(req, res) {
//   Movie.find(function (err, movies) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, movies);
//   });
// };

// Get list of movies
// exports.index = function(req, res) {
//   request('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?apikey=n98uq7kqyp3xc9hw3tq6hn6r', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       var movie = JSON.parse(body)
//     }
//   }).pipe('/api/movies')
// };

exports.show = function(req, res) {
  var movieTitle = req.params.id;  
  // Collect movie information here before creating movie object
  var movieParams = {};
  var movieBasicInfo =  
    // CanIStreamIt Query #1
    canistreamit.searchByTitle(movieTitle)
      .then(function(data) {
        data = JSON.parse(data)[0]; 
        movieParams.title = data.title;
        movieParams.year = data.year;
        movieParams.description = data.description;
        movieParams.image = data.image;
        movieParams.cast = data.actors.split(',');
        movieParams.providers = {};
        movieParams.providers.rottenTomatoes = {};
        movieParams.providers.imdb = {};
        movieParams.providers.canIStreamIt = {};
        movieParams.providers.canIStreamIt.id = data._id;
        movieParams.providers.canIStreamIt.url = data.links.shortUrl;
        movieParams.providers.rottenTomatoes.title = rottenTomatoes.extractTitleFromURL(data.links.rottentomatoes);
        movieParams.providers.rottenTomatoes.url = data.links.rottentomatoes;
        movieParams.providers.imdb.url = data.links.imdb;
        return movieParams.providers.canIStreamIt.id;
    
    // CanIStreamIt Query #2
    // Use CanIStreamIt id to query for streaming information
    }).then(function(id) {
        return canistreamit.searchByID(id)    
    }).then(function(data) {
        var data = JSON.parse(data);
        movieParams.providers.netflix = {}
        movieParams.providers.netflix.id = data.netflix_instant.external_id;        
        movieParams.providers.netflix.url = data.netflix_instant.direct_url;
        movieParams.providers.netflix.price = data.netflix_instant.price;
        return movieParams.providers.rottenTomatoes.title;
    
    // Get information from Rotten Tomatoes API
    }).then(function(rottenTomatoesTitle) {
        return rottenTomatoes.searchByTitle(rottenTomatoesTitle)
    }).then(function(data) {
        data = JSON.parse(data);
        movieParams.year = data.movies[0].year;
        movieParams.runtime = data.movies[0].runtime;
        movieParams.mpaaRating = data.movies[0].mpaa_rating;
        movieParams.releaseDates = {};
        movieParams.releaseDates.theater = data.movies[0].release_dates.theater;
        movieParams.releaseDates.dvd = data.movies[0].release_dates.dvd;
        movieParams.providers.rottenTomatoes.ratings = {}
        movieParams.providers.rottenTomatoes.ratings.critics = data.movies[0].ratings.critics_score;
        movieParams.providers.rottenTomatoes.ratings.audience = data.movies[0].ratings.audience_score;

    }).done(function() {
        return res.json(movieParams);
    });
};



exports.showMore = function(req, res) {
  var movieStreamingInfo = canistreamit.searchByID(req.params.id)
    .then(function(data){
      return res.json(data);
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
