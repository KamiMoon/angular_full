(function() {
    'use strict';

    angular.module('angularFullApp').filter("blogLimit", blogLimit);

    function blogLimit($sce) {
        return function(htmlCode) {

            //strip all images
            var content = htmlCode.replace(/<img[^>]*>/g, "");

            //strip all code
            content = content.replace(/<pre><code>([.*?][\n])<\/code><\/pre>/gm, "");

            //strip all line breaks
            content = content.replace(/<br[^>]*>/g, "");

            //strip all empty p
            content = content.replace(/<p><\/p>/g, "");

            //limit to 200 characters
            content = content.substring(0, 200);

            return $sce.trustAsHtml(content);
        };
    }

})();
