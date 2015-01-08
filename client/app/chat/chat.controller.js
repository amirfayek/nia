'use strict';

angular.module('niaApp')
  .controller('ChatCtrl', function ($scope, Auth, ChatService) {
  	
  	$scope.users = ChatService.users;

  	console.log("*ChatService`users*", ChatService.users)
  	console.log("$scope.userNames:", $scope.userNames)
  	console.log("$scope.messages:", $scope.messages)
    $scope.messages = ChatService.messages;
    $scope.user = Auth.getCurrentUser();
    $scope.newMessage = "";

	// $scope.$watchCollection(function () {
	// 	console.log("watch function")
	//  	return ChatService.messages
	// }, function (newVal, oldVal) {
	// 	console.log(newVal, oldVal)
	//     $scope.messages = newVal;
	    
	// });

  	

    $scope.say = function() {
    	ChatService.say($scope.newMessage);
    	$scope.newMessage = "";
    };
    $scope.loadUsers = function(){
    	console.log("*$scope.loadUsers*");
    	ChatService.loadUsers();
    };

});

 
