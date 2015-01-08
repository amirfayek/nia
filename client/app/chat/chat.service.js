angular.module('niaApp')
  .factory('ChatService', function ChatService($rootScope, Auth) {
    //make these js objects
    var users = [];
    var messages = [];
    var user = Auth.getCurrentUser();
    var socket = io("http://localhost:8000");

    socket.on('said', function (message) {
    	console.log("on said", message)
    	$rootScope.$apply(function() {
		    messages.push(message);
		});
    })
    socket.on('loaded', function (loadedUsers) {
        console.log("loaded!")
        console.log(loadedUsers)
        $rootScope.$apply(function() {
            names = _.pluck(loadedUsers, 'name');
            uniqueNames = _.uniq(names)
            users.push(uniqueNames)
            console.log("._mapped users", users)
        });
    });
      
    console.log("users before return:", users)
    return {
    	say: function(message) {
    		socket.emit('say', user.name + ':' + message);
    	},
        loadUsers: function() {
            console.log("*loadUsers function*", user)
            socket.emit('loadusers', user);
        },
    	users: users,
    	messages: messages
    }


});



