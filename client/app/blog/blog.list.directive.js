'use strict';

angular.module('angularFullApp')
    .directive('blogList', function($http) {
        return {
            templateUrl: 'app/blog/blog.list.html',
            restrict: 'E',
            scope: {
                current: '@'
            },
            link: function postLink($scope, $element, attrs) {
                $http.get('/api/blog/list').then(function(results) {
                    $scope.posts = results.data;
                });
            }
        };
    });
