'use strict';

angular.module('angularFullApp')
    .directive('blogKeywords', function($http) {
        return {
            templateUrl: 'app/blog/blog.keywords.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                $http.get('/api/blog/keywords').then(function(results) {
                    scope.keywords = results.data;
                });
            }
        };
    });
