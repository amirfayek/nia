'use strict';

describe('Controller: QuoteCtrl', function () {

  // load the controller's module
  beforeEach(module('niaApp'));

  var QuoteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuoteCtrl = $controller('QuoteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
