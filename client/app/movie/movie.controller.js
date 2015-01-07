'use strict';

angular.module('niaApp')
  .controller('MovieCtrl', function ($scope, $http) {

    $http.get('/api/movies').success(function(data) {
      $scope.movies = [];
      angular.forEach(data.movies, function(value, key) {
        $scope.movies.push(value);
      });
      $scope.isVisible = function(name){
        return true;// return false to hide this artist's albums
      };
    });
  });

