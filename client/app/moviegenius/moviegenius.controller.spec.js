'use strict';

describe('Controller: MoviegeniusCtrl', function () {

  // load the controller's module
  beforeEach(module('niaApp'));

  var MoviegeniusCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoviegeniusCtrl = $controller('MoviegeniusCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
