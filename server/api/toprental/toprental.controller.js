'use strict';

var _ = require('lodash');
var Toprental = require('./toprental.model');

var canistreamit = require('../../components/canistreamit')

var request = require('request');

exports.index = function(req, res) {
  request('http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?apikey=n98uq7kqyp3xc9hw3tq6hn6r').pipe(res)
};




// Get a single toprental
exports.show = function(req, res) {
  Toprental.findById(req.params.id, function (err, toprental) {
    if(err) { return handleError(res, err); }
    if(!toprental) { return res.send(404); }
    return res.json(toprental);
  });
};

// Creates a new toprental in the DB.
exports.create = function(req, res) {
  Toprental.create(req.body, function(err, toprental) {
    if(err) { return handleError(res, err); }
    return res.json(201, toprental);
  });
};

// Updates an existing toprental in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Toprental.findById(req.params.id, function (err, toprental) {
    if (err) { return handleError(res, err); }
    if(!toprental) { return res.send(404); }
    var updated = _.merge(toprental, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, toprental);
    });
  });
};

// Deletes a toprental from the DB.
exports.destroy = function(req, res) {
  Toprental.findById(req.params.id, function (err, toprental) {
    if(err) { return handleError(res, err); }
    if(!toprental) { return res.send(404); }
    toprental.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}