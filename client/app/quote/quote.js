'use strict';

angular.module('niaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/quote', {
        templateUrl: 'app/quote/quote.html',
        controller: 'QuoteCtrl'
      });
  });
