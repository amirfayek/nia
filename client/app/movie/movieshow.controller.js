'use strict';

angular.module('niaApp').controller('MovieShowCtrl', function ($scope, $http, $routeParams, User) {
  var movieName = $routeParams.id.toLowerCase();
  var uri = '/api/movies/' + movieName;

  $http.get(uri).
    success (function(data, status, headers, config) {
      console.log(data);
      $scope.movies = [data];
    }).
    error (function(data, status, headers, config) {
      console.log("Unexpected error!");
    });

  $scope.addFavorite = function(movie) {
    console.log("add");
    console.log(req.user._id);
    // movie.favorites.users.push(User);
  }

});
