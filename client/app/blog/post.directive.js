'use strict';

angular.module('angularFullApp')
    .directive('blogPost', function($timeout) {
        return {
            templateUrl: 'app/blog/post.html',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {

                $timeout(function() {
                    $timeout(function() {

                        //code highlighting
                        element.find('code').each(function(i, block) {
                            hljs.highlightBlock(block);
                        });
                    });
                });
            }
        };
    });
