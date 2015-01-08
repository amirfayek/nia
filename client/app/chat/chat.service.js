angular.module('niaApp')
  .factory('ChatService', function ChatService($rootScope, Auth) {
    var users = [];
    //make these js objects
    var messages = [];
    var user = Auth.getCurrentUser();
    var socket = io("http://localhost:8000");

    socket.on('said', function (message) {
    	console.log("on said", message)
    	$rootScope.$apply(function() {
		    messages.push(message);
		});
    })
    
    return {
    	say: function(message) {
    		console.log(message)
    		socket.emit('say', user.name + ':' + message);
    	},
    	users: users,
    	user: user.name,
    	messages: messages
    }
});