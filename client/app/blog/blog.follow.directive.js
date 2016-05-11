(function() {
    'use strict';

    angular.module('angularFullApp').component('blogFollow', {
        templateUrl: 'app/blog/blog.follow.html',
        bindings: {},
        controller: FollowController,
        controllerAs: 'vm'
    });

    function FollowController(ValidationService, BlogService) {
        var vm = this;
        vm.save = save;
        vm.follow = {
            followers: 0,
            email: ''
        };

        function getMailListTotal() {
            BlogService.getMailingListTotal().$promise.then(function(totalObj) {
                vm.follow.followers = totalObj.total;
            });
        }

        function save(form) {
            if (form.$valid) {

                BlogService.subscribeToMailingList({
                    email: vm.follow.email
                }).$promise.then(function() {
                    ValidationService.success('You have been added to the mailing list');

                    getMailListTotal();
                });

            }
        }

        getMailListTotal();
    }

})();
