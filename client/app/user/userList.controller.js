(function() {
    'use strict';

    angular.module('angularFullApp')

    .controller('UserListController', function($scope, User, ValidationService) {

        $scope.users = User.query();

        $scope.searchParams = {};

        $scope.search = function() {

            $scope.users = User.query($scope.searchParams);

        };

        $scope.delete = function(id) {
            if (id) {

                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                    User.delete({
                        id: id
                    }).$promise.then(function() {
                        ValidationService.success();

                        angular.forEach($scope.users, function(obj, i) {
                            if (obj._id === id) {
                                $scope.users.splice(i, 1);
                            }
                        });

                    }, function() {
                        ValidationService.error('Delete Failed');
                    });
                }

            }
        };

    })

})();
