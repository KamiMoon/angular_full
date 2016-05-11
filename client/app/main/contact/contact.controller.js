(function() {
    'use strict';

    angular.module('angularFullApp').controller('ContactController', ContactController);

    function ContactController(ContactService, vcRecaptchaService, ValidationService) {
        var vm = this;
        vm.contact = {
            name: '',
            email: '',
            message: ''
        };
        vm.save = save;

        function save(form) {

            var captchaResponse = vcRecaptchaService.getResponse();

            if (captchaResponse === '') { //if string is empty
                ValidationService.error('Please resolve the captcha and submit!');
            } else {
                vm.contact['g-recaptcha-response'] = vcRecaptchaService.getResponse();

                if (form.$valid) {

                    ContactService.sendContactMessage(vm.contact).then(function() {
                        ValidationService.success('Your Message Has Been Sent.');
                    }, function(err) {
                        ValidationService.error();
                    });
                }
            }

        }

    }

})();
