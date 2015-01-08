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
    socket.on('loaded', function (loadedUser) {
        console.log("loaded!")
        $rootScope.$apply(function() {
            // names = _.pluck(loadedUsers, 'name');
            // ids = _.pluck(loadedUsers, '_id');
            // uniqueNames = _.uniq(loadedUsers).filter(function(e){return e});
            // console.log("uniqueNames:", uniqueNames);
            
            users.push(loadedUser)
            // users.push(uniqueNames);
            
        });
    });

    socket.on('dced', function (dcedUser) {
        $rootScope.$apply(function() {
            users = $.grep(data, function(e){ 
                return e._id != dcedUser._id; 
            });

            
        });
    });
      
    return {
    	say: function(message) {
    		socket.emit('say', user.name + ': ' + message);
    	},
        loadUsers: function() {
            console.log("*loadUsers function*", user)
            socket.emit('loadusers', user);
        },
    	users: users,
    	messages: messages
    }


});



