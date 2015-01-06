'use strict';

angular.module('niaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movieshow', {
        templateUrl: 'app/movieshow/movieshow.html',
        controller: 'MovieshowCtrl'
      });
  });
