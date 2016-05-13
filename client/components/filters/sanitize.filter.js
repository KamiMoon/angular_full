(function() {
    'use strict';

    angular.module('angularFullApp').filter("sanitize", sanitize);

    function sanitize($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
    }

})();
