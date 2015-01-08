'use strict';

angular.module('niaApp')
  .controller('MovieshowCtrl', function ($scope, $http, $routeParams) {
    var movieName = $routeParams.moviename.toLowerCase();
    var uri = "http://localhost:9000/api/movies/" + movieName;

    $http.get(uri).
      success(function(data, status, headers, config) {
        $scope.movies = data;
      }).
      error(function(data, status, headers, config) {
        console.log("Unexpected error!")
      })
  });



// angular.module('niaApp')
//   .controller("MovieshowCtrl", function ($scope, $http) {
//       $http.get("../server/api/movie/movie.controller.js").success(function (data) {
//         $scope.movie = data;
//         console.log(data);

//       }).error(function() {
//         alert("HELP");
//       });
//   });

