'use strict';

angular.module('niaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/moviegenius', {
        templateUrl: 'app/moviegenius/moviegenius.html',
        controller: 'MoviegeniusCtrl'
      });
  });
