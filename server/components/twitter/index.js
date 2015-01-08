var https = require('https');
var querystring = require('querystring');
var Q = require('q');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = function(twitterOptions) {
  
  // invisible outside of this module
  // use to cache our access token
  var accessToken;

  // invisible outside of this module
  // makes a twitter api request once - subsequent calls return value of accessToken
  function getAccessToken(cb) {
    if (accessToken) return cb(accessToken);
    
    var bearerToken = new Buffer (
      encodeURIComponent(process.env.TWITTER_ID) + ':' +
      encodeURIComponent(process.env.TWITTER_SECRET)                          
    ).toString('base64');

    var options = {
      hostname: 'api.twitter.com',
      port: 443,
      method: 'POST',
      path: '/oauth2/token?grant_type=client_credentials',
      headers: {
        'Authorization': 'Basic' + bearerToken,
      },
    };

    https.request(options, function(res) {
      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', function() {
        var auth = JSON.parse(data);
        if(auth.token_type!=='bearer') {
          console.log('Twitter auth failed.');
          return;
        }
        accessToken = auth.access_token;
        cb(accessToken);
      });
    }).end();
  }

  function getTopTweets(cb){
  if(Date.now() < topTweets.lastRefreshed + topTweets.refreshInterval)
  return cb(topTweets.tweets);
  twitter.search('#meadowlarktravel', topTweets.count, function(result){
  var formattedTweets = [];
  var promises = [];
  var embedOpts = { omit_script: 1 };
  result.statuses.forEach(function(status){
  var deferred = Q.defer();
  twitter.embed(status.id_str, embedOpts, function(embed){
  formattedTweets.push(embed.html);
  deferred.resolve();
  });
  promises.push(deferred.promise);
  });
  Q.all(promises).then(function(){
  topTweets.lastRefreshed = Date.now();
  cb(topTweets.tweets = formattedTweets);
  });
  });
  }

  return {
    search: function(query, count, cb) {
      getAccessToken(function(accessToken) {
        var options = {
          hostname: 'api.twitter.com',
          port: 443,
          method: 'GET',
          path: '/1.1/search/tweets.json?q=' +
                encodeURIComponent(query) +
                '&count=' + (count || 10),
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        };

        https.request(options, function(res) {
          var data = '';
          res.on('data', function(chunk) {
            data += chunk;
          });
          res.on('end', function(){
            cb(JSON.parse(data));
          });
        }).end();
      });
    },

    embed: function(statusId, options, cb) {
      if(typeof options==='function') {
        cb = options;
        options = {};
      }
      options.id = statusId;
      getAccessToken(function(accessToken) {
        var requestOptions = {
          hostname: 'api.twitter.com',
          port: 443,
          method: 'GET',
          path: '/1.1/statuses/oembed.json?' +
                querystring.stringify(options),
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          }
        };
        https.request(requestOptions, function(res){
          var data = '';
          res.on('data', function(chunk){
            data += chunk;
          });
          res.on('end', function(){
            cb(JSON.parse(data));
          });
        }).end();
      });
    },


  }
}