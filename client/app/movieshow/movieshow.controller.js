'use strict';

angular.module('niaApp')
  .controller('MovieshowCtrl', function ($scope, $http, $routeParams) {
    var movieName = $routeParams.moviename.toLowerCase();
    var uri = '/api/movies/' + movieName;

    $http.get(uri).
      success(function(data, status, headers, config) {
        console.log(data)
        $scope.movies = [data];
      }).
      error(function(data, status, headers, config) {
        console.log("Unexpected error!")
      })
  });
