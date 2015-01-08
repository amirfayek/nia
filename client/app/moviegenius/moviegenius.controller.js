// 'use strict';

// angular.module('niaApp')
//   .controller('MoviegeniusCtrl', function ($scope, $http) {
//     var movieList = ["Vertigo", "Batman Begins", "Battle Royale", "The Simpsons", "The Shining"];
//     var randomMovie = movieList.sample();
//     var uri = "http://localhost:9000/api/movies/" + randomMovie;
//     $http.get(uri).
//       success(function(data, status, headers, config) {
//         $scope.movies = data;
//       }).
//       error(function(data, status, headers, config) {
//         console.log("Unexpected error!");
//       });
//   });


'use strict';

angular.module('niaApp')
  .controller('MoviegeniusCtrl', function ($scope, $http, $routeParams) {

    var movieList = ["Vertigo", "Batman Begins", "Battle Royale", "The Simpsons", "The Shining", "A Beautiful Mind", "Harry Potter"];
    function getInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    var randomNum = getInt(0, movieList.length);
    var randomMovie = movieList[randomNum];
    console.log(randomMovie);

    $http.get('http://localhost:9000/api/movies/' + randomMovie).
      success(function(data, status, headers, config) {
        console.log(data)
        $scope.movies = data;
      }).
      error(function(data, status, headers, config) {
        console.log("Unexpected error!")
      })
  });
