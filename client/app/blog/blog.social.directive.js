(function() {
    'use strict';

    angular.module('angularFullApp')
        .directive('blogSocial', blogSocial);

    function blogSocial() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/blog/blog.social.html',
            scope: {}
        };

        return directive;
    }

})();
