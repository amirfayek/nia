'use strict';

angular.module('niaApp')
  .controller('ChatCtrl', function ($scope, Auth, ChatService) {
  	$scope.count = 0;
  	$scope.users = ChatService.users;
    $scope.messages = ChatService.messages;
    $scope.user = Auth.getCurrentUser();
    $scope.newMessage = "";
    
	$scope.$watchCollection(function () {
		console.log("watch function")
	 	return ChatService.messages
	}, function (newVal, oldVal) {
		console.log(newVal, oldVal)
	    $scope.messages = newVal;
	    $scope.count++
	});

    $scope.say = function() {
    	ChatService.say($scope.newMessage);
    	$scope.newMessage = "";
    }

  });
