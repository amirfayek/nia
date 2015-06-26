'use strict';

var request = require('request'),
    http = require('http'),
    Q = require('q');

module.exports = {

  topMovies: function() {
    var movieArray = [];
    request('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?apikey=n98uq7kqyp3xc9hw3tq6hn6r', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var movie = JSON.parse(body)
        for (var key in movie) {
          movieArray.push(movie[key])
        }
        return movieArray
      }
    });
  },

  currentReleases: function() {
    request('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/current_releases.json?apikey=n98uq7kqyp3xc9hw3tq6hn6r', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var movie = JSON.parse(body)
      }
    });
  },

  extractTitleFromURL: function(url) {
      var regex = /.*m\/(.+)\//;
      return regex.exec(url)[1].replace(/_/g, " ");
  },

  searchByID: function(rottenTomatoesID) {
      var data = Q.defer();
      var options = {
        uri: 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + rottenTomatoesID + '.json?apikey=' + process.env.ROTTEN_TOMATOES_SECRET,
        method: 'GET'
      }

      request(options, function(err, response, body) {
        if (err) {
          var error = new Error('Something went wrong trying to get canistreamit data');
          error.innerError = err;
          throw error;
        }
        data.resolve(body);
      });
      return data.promise;
    },

  searchByTitle: function(rottenTomatoesTitle) {
    var data = Q.defer();
    var options = {
      uri: 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=' + process.env.ROTTEN_TOMATOES_SECRET + '&q=' + rottenTomatoesTitle + '&page_limit=1',
      method: 'GET'
    }

    request(options, function(err, response, body) {
      if (err) {
        var error = new Error('Something went wrong trying to get canistreamit data');
        error.innerError = err;
        throw error;
      }

      data.resolve(body);
    });

    return data.promise;
  }


};
