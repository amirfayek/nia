'use strict';

angular.module('niaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/chat', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl'
      });
  });
 

