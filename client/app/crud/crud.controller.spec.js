'use strict';

describe('Controller: CrudController', function() {

    // load the controller's module
    beforeEach(module('angularFullApp'));

    var CrudController, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        CrudController = $controller('CrudController', {
            $scope: scope
        });
    }));

    it('should ...', function() {
        expect(1).toEqual(1);
    });
});
