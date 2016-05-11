(function() {
    'use strict';

    angular.module('angularFullApp').controller('UserViewController', function($scope, $stateParams, User, ValidationService) {
        var id = $stateParams.id;

        if (!id) {
            User.get().$promise.then(function(user) {
                $scope.user = user;
                showMessageToFillOutProfile(user);
            });
        } else {
            User.profile({
                id: id
            }).$promise.then(function(user) {
                $scope.user = user;
                showMessageToFillOutProfile(user);
            });
        }

        var showMessageToFillOutProfile = function(user) {
            if (!user.name) {
                ValidationService.info("Your profile has not been filled out.  Click 'Edit' to complete your profile.");
            }
        };



    });

})();
