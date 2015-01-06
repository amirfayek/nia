'use strict';

angular.module('niaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movie', {
        templateUrl: 'app/movie/movie.html',
        controller: 'MovieCtrl'
      });
  });
