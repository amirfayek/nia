'use strict';

angular.module('niaApp')
  .controller('ChatCtrl', function ($scope, Auth) {
    $scope.message = 'Hello';
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
