var http = require('http');
var request = require('request');
var Q = require('q');

module.exports = {
  
  searchByTitle: function(movieName) {
    var data = Q.defer();
    var options = {
      uri: 'http://www.canistream.it/services/search?movieName=' + movieName,
      method: 'GET'      
    }
    
    request(options, function(err, response, body) {
      if (err) {
        var error = new Error('Something went wrong trying to get canistreamit data');
        error.innerError = err;
        throw error;
      }

      data.resolve(body);
    });
    
    return data.promise;
  },

  searchByID: function(id) {
    var data = Q.defer();
    var options = {
      uri: 'http://www.canistream.it/services/query?movieId=' + id + '&attributes=1&mediaType=streaming',
      method: 'GET'
    }

    request(options, function(err, response, body) {
      if (err) {
        var error = new Error('Something went wrong trying to get canistreamit data');
        error.innerError = err;
        throw error;
      }

      data.resolve(body);
    });
    
    return data.promise;
  },




}
