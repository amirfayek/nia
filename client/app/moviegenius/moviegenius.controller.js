'use strict';

angular.module('niaApp')
  .controller('MoviegeniusCtrl', function ($scope, $http, $routeParams) {

    var randomMovie = Math.random(1, 300);
    console.log(randomMovie);

    $http.get('http://localhost:9000/api/movies/batman').
      success(function(data, status, headers, config) {
        console.log(data)
        $scope.movies = data;
      }).
      error(function(data, status, headers, config) {
        console.log("Unexpected error!")
      })
  });




