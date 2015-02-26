'use strict';

angular.module('niaApp')
  .controller('MovieCtrl', function ($scope, $http) {

    $http.get('/api/movies').success(function(data) {
      $scope.movies = [];
      angular.forEach(data.movies, function(value, key) {
        $scope.movies.push(value);
      });
      $scope.isVisible = function(name){
        return true;
      };
    });
    
    $http.get('/api/toprentals').success(function(data) {
      $scope.topRentals = [];
      angular.forEach(data.movies, function(value, key) {
        $scope.topRentals.push(value);
      });
      $scope.isVisible = function(name){
        return true;
      };
    });
  });


