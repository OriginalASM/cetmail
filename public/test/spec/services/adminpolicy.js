'use strict';

describe('Service: AdminPolicy', function () {

  // load the service's module
  beforeEach(module('App'));

  // instantiate service
  var AdminPolicy;
  beforeEach(inject(function (_AdminPolicy_) {
    AdminPolicy = _AdminPolicy_;
  }));

  it('should do something', function () {
    expect(!!AdminPolicy).toBe(true);
  });

});
