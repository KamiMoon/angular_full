(function() {
    'use strict';

    angular.module('angularFullApp')
        .directive('blogKeywords', blogKeywords);

    function blogKeywords(BlogService) {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/blog/blog.keywords.html',
            scope: {
                keyword: '@'
            },
            controller: KeywordsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function KeywordsController() {
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
    }

})();
