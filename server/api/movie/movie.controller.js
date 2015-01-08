'use strict';

var _ = require('lodash');
var underscore = require('underscore');

// var Movie = require('./movie.model');

var Movie = require('./movie.model');



var canistreamit = require('../../components/canistreamit')

var request = require('request');
var rottenTomatoes = require('../../components/rottentomatoes')

exports.index = function(req, res) {
  request('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json?apikey=n98uq7kqyp3xc9hw3tq6hn6r').pipe(res)
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
  // original working function
  // var movieBasicInfo = canistreamit.searchByTitle(req.params.id)
  //   .then(function(data) {
  //     return res.json(JSON.parse(data));
  // });

  var id;
  var movieInfo = {};
  var partOne;

  var movieBasicInfo =
    canistreamit.searchByTitle(req.params.id)
      .then(function(data) {
        movieInfo = JSON.parse(data) [0 ];
        var dataID = movieInfo._id;
        return dataID;
    }).then(function(id) {
        return canistreamit.searchByID(id)
    }).then(function(data) {
        movieInfo = underscore.extend(movieInfo, JSON.parse(data));
        console.log("PART TWO");
        console.log(data);
        return data;
    }).done(function() {
        // console.log("HI")
        // console.log(movieInfo)
        // console.log("BYE")
        // console.log(movieInfo)
        return res.json(movieInfo);
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