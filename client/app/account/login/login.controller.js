(function() {
    'use strict';

    angular.module('angularFullApp')
        .controller('LoginController', LoginController);

    function LoginController(Auth, $location, ValidationService) {
        var vm = this;

        vm.user = {};
        vm.login = login;

        function login(form) {
            if (form.$valid) {
                Auth.login({
                        email: vm.user.email,
                        password: vm.user.password
                    })
                    .then(function() {
                        ValidationService.success('Logged In');
                        // Logged in, redirect to home
                        Auth.getUser().$promise.then(function(user) {
                            $location.path('/profile/' + user._id);
                        });

                    })
                    .catch(function(err) {
                        ValidationService.error(err.message);
                    });
            }
        }

        //vm.loginOauth = function(provider) {
        //    $window.location.href = '/auth/' + provider;
        //};
    }

})();
