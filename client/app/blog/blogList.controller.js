'use strict';

angular.module('angularFullApp').controller('BlogCtrl', function($scope, $stateParams, BlogService, $timeout) {

    $scope.searchParams = {
        page: 1,
        itemsPerPage: 10,
        totalItems: 0
    };

    if ($stateParams.keyword) {
        $scope.searchParams['keywords.text'] = $stateParams.keyword;
    }

    //paging https://angular-ui.github.io/bootstrap/#/pagination
    var runQuery = function() {

        BlogService.query($scope.searchParams).$promise.then(function(postWrapper) {
            $scope.posts = postWrapper.posts;

            $scope.searchParams.page = postWrapper.paging.page;
            $scope.searchParams.itemsPerPage = postWrapper.paging.itemsPerPage;
            $scope.searchParams.totalItems = postWrapper.paging.totalItems;

            $timeout(function() {
                $timeout(function() {
                    $scope.loadCommentCount();
                });
            });

        });
    };

    $scope.pageChanged = function() {
        runQuery();
    };

    runQuery();

});