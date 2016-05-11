(function () {
    'use strict';

    angular.module('angularFullApp').controller('BlogListController', BlogListController);

    function BlogListController($rootScope, $stateParams, BlogService, $timeout) {
        var vm = this;

        vm.searchParams = {
            page: 1,
            itemsPerPage: 10,
            totalItems: 0
        };

        if ($stateParams.keyword) {
            vm.searchParams['keywords.text'] = $stateParams.keyword;
        }

        vm.pageChanged = runQuery;

        //paging https://angular-ui.github.io/bootstrap/#/pagination
        function runQuery() {

            BlogService.query(vm.searchParams).$promise.then(function(postWrapper) {
                vm.posts = postWrapper.posts;

                vm.searchParams.page = postWrapper.paging.page;
                vm.searchParams.itemsPerPage = postWrapper.paging.itemsPerPage;
                vm.searchParams.totalItems = postWrapper.paging.totalItems;

                $timeout(function() {
                    $timeout(function() {
                        //TODO - terrible get rid of $rootScope
                        $rootScope.loadCommentCount();
                    });
                });

            });
        };

        runQuery();

    };

})();