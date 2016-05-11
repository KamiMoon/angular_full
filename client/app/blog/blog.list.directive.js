(function() {
    'use strict';

    angular.module('angularFullApp').component('blogList', {
        templateUrl: 'app/blog/blog.list.html',
        bindings: {
            current: '@'
        },
        controller: BlogListController,
        controllerAs: 'vm'
    });

    function BlogListController(BlogService) {
        var vm = this;

        BlogService.getListOfPosts().$promise.then(function(posts) {
            vm.posts = posts;
        });
    }

})();
