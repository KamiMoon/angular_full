'use strict';

angular.module('angularFullApp')
    .directive('blogSocial', function($http) {
        return {
            templateUrl: 'app/blog/blog.social.html',
            restrict: 'E',
            scope: {},
            link: function postLink(scope, element, attrs) {

            }
        };
    });
