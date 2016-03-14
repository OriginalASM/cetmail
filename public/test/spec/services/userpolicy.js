'use strict';

describe('Service: UserPolicy', function () {

  // load the service's module
  beforeEach(module('App'));

  // instantiate service
  var UserPolicy;
  beforeEach(inject(function (_UserPolicy_) {
    UserPolicy = _UserPolicy_;
  }));

  it('should do something', function () {
    expect(!!UserPolicy).toBe(true);
  });

});
