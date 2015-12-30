'use strict';

angular.module('angularFullApp')
    .directive('blogKeywords', function($http) {
        return {
            templateUrl: 'app/blog/blog.keywords.html',
            restrict: 'E',
            scope: {
                keyword: '@'
            },
            link: function postLink($scope, $element, attrs) {
                $http.get('/api/blog/keywords').then(function(results) {

                    //highlight
                    if ($scope.keyword) {
                        for (var i = 0; i < results.data.length; i++) {
                            if ($scope.keyword === results.data[i]._id) {
                                results.data[i].active = true;
                                break;
                            }
                        }
                    }

                    $scope.keywords = results.data;
                });
            }
        };
    });
