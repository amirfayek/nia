'use strict';

var module = module.exports = {
  topMovies: function() {
    var request = require('request');
    request('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?apikey=n98uq7kqyp3xc9hw3tq6hn6r', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var movie = JSON.parse(body)
        for (var key in movie) {
          console.log(movie[key])
        }
      }
    });
  }
};

module.topMovies();