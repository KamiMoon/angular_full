(function() {
    'use strict';

    angular.module('angularFullApp').controller('UserViewController', UserViewController);

    function UserViewController($stateParams, User, ValidationService) {
        var id = $stateParams.id;

        var vm = this;
        vm.user = null;

        if (!id) {
            User.get().$promise.then(function(user) {
                vm.user = user;
                showMessageToFillOutProfile(user);
            });
        } else {
            User.profile({
                id: id
            }).$promise.then(function(user) {
                vm.user = user;
                showMessageToFillOutProfile(user);
            });
        }

        function showMessageToFillOutProfile(user) {
            if (!user.name) {
                ValidationService.info("Your profile has not been filled out.  Click 'Edit' to complete your profile.");
            }
        }
    }

})();
