'use strict';

describe('Controller: CrudCtrl', function () {

  // load the controller's module
  beforeEach(module('angularFullApp'));

  var CrudCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrudCtrl = $controller('CrudCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
