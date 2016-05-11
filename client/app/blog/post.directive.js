(function() {
    'use strict';

    angular.module('angularFullApp').component('blogPost', blogPost);

    function blogPost($timeout) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/blog/post.html',
            scope: {
                post: '='
            },
            link: postLink
        };

        return directive;

        function postLink(scope, element) {

            $timeout(function() {
                $timeout(function() {

                    //code highlighting
                    element.find('code').each(function(i, block) {
                        hljs.highlightBlock(block);
                    });
                });
            });
        }
    }

})();
