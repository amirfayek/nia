'use strict';

describe('Service: movie', function () {

  // load the service's module
  beforeEach(module('niaApp'));

  // instantiate service
  var movie;
  beforeEach(inject(function (_movie_) {
    movie = _movie_;
  }));

  it('should do something', function () {
    expect(!!movie).toBe(true);
  });

});
