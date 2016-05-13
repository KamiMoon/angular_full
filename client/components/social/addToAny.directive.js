(function() {
    'use strict';

    angular.module('angularFullApp')
        .component('addToAny', {
            templateUrl: 'components/social/addToAny.html',
            bindings: {
                url: '@',
                title: '@'
            },
            controller: addToAny,
            controllerAs: 'vm'
        });

    function addToAny() {
        var vm = this;

        vm.$postLink = function() {
            //https://www.addtoany.com/buttons/customize/multiple_buttons_customize
            a2a_config.linkname = vm.title;
            a2a_config.linkurl = window.location.origin + vm.url;
            a2a.init('page');
        };
    }

})();
