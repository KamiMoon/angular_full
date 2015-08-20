'use strict';

angular.module('angularFullApp')
    .controller('NavbarCtrl', function($scope, $location) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = true;
        $scope.isAdmin = true;
        //$scope.getCurrentUser = Auth.getCurrentUser;

        //$scope.logout = function() {
        //  Auth.logout();
        //  $location.path('/login');
        //};

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });