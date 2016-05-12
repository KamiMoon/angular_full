(function() {
    'use strict';

    angular.module('angularFullApp')
        .controller('SettingsController', SettingsController);

    function SettingsController(User, Auth, $location, ValidationService) {
        var vm = this;
        vm.errors = {};
        vm.user = {};
        vm.changePassword = changePassword;

        function changePassword(form) {
            if (form.$valid) {
                Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
                    .then(function() {
                        ValidationService.success('Password successfully changed.');
                        $location.path('/profile/' + Auth.getCurrentUser()._id);
                    })
                    .catch(function() {
                        form.password.$setValidity('mongoose', false);
                        vm.errors.other = 'Incorrect password';
                        vm.message = '';
                    });
            }
        }
    }

})();
