(function() {
    'use strict';

    angular.module('angularFullApp')
        .component('blogKeywords', {
            templateUrl: 'app/blog/blog.keywords.html',
            bindings: {
                keyword: '@'
            },
            controller: KeywordsController,
            controllerAs: 'vm'
        });

    function KeywordsController(BlogService) {
        var vm = this;

        BlogService.getKeywords().$promise.then(function(keywords) {

            //highlight active keyword
            if (vm.keyword) {
                for (var i = 0; i < keywords.length; i++) {
                    if (vm.keyword === keywords[i]._id) {
                        keywords[i].active = true;
                        break;
                    }
                }
            }

            vm.keywords = keywords;
        });
    }

})();
