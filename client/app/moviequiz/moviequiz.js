'use strict';

angular.module('niaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviequiz', {
        templateUrl: 'app/moviequiz/moviequiz.html',
        controller: 'MoviequizCtrl'
      });
  });
