(function() {
    'use strict';

    angular.module('angularFullApp')
        .component('navbar', {
            templateUrl: 'components/navbar/navbar.html',
            bindings: {},
            controller: NavbarController,
            controllerAs: 'vm'
        });

    function NavbarController($location, Auth) {
        var vm = this;
        vm.isLoggedIn = Auth.isLoggedIn;
        vm.getCurrentUser = Auth.getCurrentUser;
        vm.logout = logout;

        function logout() {
            Auth.logout();
            $location.path('/login');
        }

        vm.$postLink = function() {
            $(".navbar-nav li:not(.dropdown) a").click(function() {
                $(".navbar-collapse").collapse('hide');
            });
        };
    }

})();
