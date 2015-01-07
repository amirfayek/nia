'use strict';

angular.module('niaApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/chat/:chat_id', {
        templateUrl: 'app/chat/chat.html',
        controller: 'ChatCtrl'
      });
});
