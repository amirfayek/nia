'use strict';

angular.module('niaApp')
  .controller('MoviegeniusCtrl', function ($scope, $http, $routeParams) {

    var movieList = ["Vertigo", "Top Gun", "Demolition Man", "Batman Begins", "Battle Royale", "The Simpsons", "A Beautiful Mind", "Harry Potter", "The Room", "Sisterhood of the Traveling Pants", "The Rock", "The Hobbit"];
    function getInt(min, max) {
      return Math.floor(Math.random() * (max-min)) + min;
    };
    var randomNum = getInt(0, movieList.length);
    var randomMovie = movieList[randomNum];


    $http.get('http://localhost:9000/api/movies/' + randomMovie).
      success(function(data, status, headers, config) {
        console.log(data)
        $scope.movies = data;
      }).
      error(function(data, status, headers, config) {
        console.log("Unexpected error!")
      })
  });




