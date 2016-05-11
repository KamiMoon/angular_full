(function () {
    'use strict';

    angular.module('angularFullApp').controller('BlogViewController', BlogViewController);

    function BlogViewController($rootScope, SEOService, $timeout, $stateParams, BlogService, ValidationService, ControllerUtil) {
        var id = $stateParams.id;

        var vm = this;
        vm.contentLoaded = false;
        vm.delete = doDelete;
        vm.publishToMailingList = publishToMailingList;

        BlogService.get({
            id: id
        }).$promise.then(function(post) {
            vm.post = post;
            vm.contentLoaded = true;

            SEOService.setSEO({
                title: post.title,
                description: post.headingQuote,
                author: post.user_name,
                image: post.photo
            });

            $timeout(function() {
                $timeout(function() {
                    $rootScope.loadCommentCount();
                });
            });
        });

        function doDelete() {
            ControllerUtil.delete(id, BlogService, '/blog');
        }

        function publishToMailingList(id) {
            BlogService.publishToMailingList({
                id: id
            }).$promise.then(function(results) {
                ValidationService.success('Article Published.');
            });
        }
    }

})();