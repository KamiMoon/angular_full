angular.module('angularFullApp').controller('BlogViewCtrl', function($scope, SEOService, $timeout, $stateParams, Auth, BlogService, ValidationService, $location, ControllerUtil, $http) {

    var id = $stateParams.id;
    $scope.contentLoaded = false;

    BlogService.get({
        id: id
    }).$promise.then(function(post) {
        $scope.post = post;
        $scope.contentLoaded = true;

        SEOService.setSEO({
            title: post.title,
            description: post.headingQuote,
            author: post.user_name,
            image: post.photo
        });

        $timeout(function() {
            $timeout(function() {
                $scope.loadCommentCount();
            });
        });
    });

    $scope.delete = function() {
        ControllerUtil.delete(id, BlogService, '/blog');
    };

    $scope.publishToMailingList = function(id) {
        $http.get('/api/blog/publish/' + id).then(function(results) {
            ValidationService.success('Article Published.');
        });
    };

});