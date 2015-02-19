'use strict';

angular.module('niaApp')
  .factory('movie', function () {
    // Service logic
    // ...

    var favorites = {
      users: []
    }

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
