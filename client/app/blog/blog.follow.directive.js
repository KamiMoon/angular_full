(function() {
    'use strict';

    angular.module('angularFullApp').directive('blogFollow', blogFollow);

    function blogFollow(ValidationService, BlogService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/blog/blog.follow.html',
            scope: {},
            controller: FollowController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function FollowController() {
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
    }

})();
