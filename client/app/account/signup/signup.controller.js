(function() {
    'use strict';

    angular.module('angularFullApp')
        .controller('SignupController', SignupController);

    function SignupController(Auth, $location, ValidationService, vcRecaptchaService) {
        var vm = this;

        vm.user = {};
        vm.register = register;

        function register(form) {

            var captchaResponse = vcRecaptchaService.getResponse();

            if (captchaResponse === '') { //if string is empty
                ValidationService.error('Please resolve the captcha and submit!');
            } else {
                vm.user['g-recaptcha-response'] = vcRecaptchaService.getResponse();

                if (form.$valid) {

                    Auth.createUser(vm.user)
                        .then(function() {
                            ValidationService.success('You have been registered. Check your email to verify.');
                            // Account created, redirect to home
                            $location.path('/thanks');
                        }, function(err) {
                            ValidationService.displayErrors(form, err);
                        });
                }
            }
        }

        //vm.loginOauth = function(provider) {
        //    $window.location.href = '/auth/' + provider;
        //};
    }

})();
