(function() {
    'use strict';

    angular.module('angularFullApp').directive('blogList', blogList);

    function blogList(BlogService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/blog/blog.list.html',
            scope: {
                current: '@'
            },
            controller: BlogListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function BlogListController() {
            var vm = this;

            BlogService.getListOfPosts().$promise.then(function(posts) {
                vm.posts = posts;
            });
        }
    }

})();
