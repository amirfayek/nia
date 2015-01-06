'use strict';

describe('Controller: MoviequizCtrl', function () {

  // load the controller's module
  beforeEach(module('niaApp'));

  var MoviequizCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoviequizCtrl = $controller('MoviequizCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
