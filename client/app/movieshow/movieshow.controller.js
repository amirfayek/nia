'use strict';

angular.module('niaApp')
  .controller('MovieshowCtrl', function ($scope, $http, $routeParams) {
    // var movieName = $routeParams.movieName;
    // console.log(movieName);
    // console.log($routeParams);
    var movieName = $routeParams.moviename.toLowerCase();
    // console.log(movieName);
    var uri = "http://localhost:9000/api/movies/" + movieName;

    // console.log("this is the uri:")
    // console.log(uri);


    $http.get(uri).
      success(function(data, status, headers, config) {
        // console.log(data)
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

