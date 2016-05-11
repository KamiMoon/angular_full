'use strict';

angular.module('angularFullApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('userList', {
                url: '/user',
                templateUrl: 'app/user/userList.html',
                controller: 'UserListController',
                controllerAs: 'vm',
                roles: ['admin']
            }).state('userEdit', {
                url: '/user/edit/:id',
                templateUrl: 'app/user/userEdit.html',
                controller: 'UserEditController',
                controllerAs: 'vm'
            }).state('userView', {
                url: '/profile/:id',
                templateUrl: 'app/user/userView.html',
                controller: 'UserViewController',
                controllerAs: 'vm'
            });
    });
