'use strict';

angular.module('niaApp')
.controller('MovieShowCtrl', function ($scope, $http, $routeParams, Auth, User) {
  var movieName = $routeParams.id.toLowerCase();
  var uri = '/api/movies/' + movieName;
  var currentUser = Auth.getCurrentUser();

  $http.get(uri).
    success(function(data, status, headers, config) {
      $scope.movies = [data];
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log("Unexpected error!");
    });

  $scope.toggleFavorite = function(movie) {
    console.log("add");
    $http.post('/api/users/' + currentUser._id + '/favorites', { movie: $scope.movies });
  }

});
