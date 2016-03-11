'use strict';

describe('Controller: FourohthreeCtrl', function () {

  // load the controller's module
  beforeEach(module('App'));

  var FourohthreeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FourohthreeCtrl = $controller('FourohthreeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FourohthreeCtrl.awesomeThings.length).toBe(3);
  });
});
