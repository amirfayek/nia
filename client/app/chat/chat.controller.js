'use strict';

angular.module('niaApp')
  .controller('ChatCtrl', function ($scope, Auth, ChatService) {
  	
  	$scope.users = ChatService.users;

  	console.log("*ChatService`users*", ChatService.users)
    $scope.messages = ChatService.messages;
    $scope.user = Auth.getCurrentUser();
    $scope.newMessage = "";
  	

    $scope.say = function() {
    	ChatService.say($scope.newMessage);
    	$scope.newMessage = "";
    };
    $scope.loadUsers = function(){
    	console.log("*$scope.loadUsers*");
    	ChatService.loadUsers();
    };

});

 
