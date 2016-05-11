(function() {
    'use strict';

    angular.module('angularFullApp').controller('UserEditController', function($scope, $location, $stateParams, User, ControllerUtil) {
        var id = $stateParams.id;

        $scope.user = User.profile({
            id: id
        });

        $scope.save = function(form) {

            if (form.$valid) {

                var request = User.update({
                    id: id
                }, $scope.user).$promise;

                ControllerUtil.handle(request, form).then(function() {
                    $location.path('/profile/' + id);
                });
            }

        };

    });

})();
