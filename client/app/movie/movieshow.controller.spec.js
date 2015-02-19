'use strict';

describe('Controller: MovieshowCtrl', function () {

  // load the controller's module
  beforeEach(module('niaApp'));

  var MovieshowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MovieshowCtrl = $controller('MovieshowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
