'use strict';

angular.module('angularFullApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('userList', {
                url: '/user',
                templateUrl: 'app/user/userList.html',
                controller: 'UserListController',
                roles: ['admin']
            }).state('userEdit', {
                url: '/user/edit/:id',
                templateUrl: 'app/user/userEdit.html',
                controller: 'UserEditController',
            }).state('userView', {
                url: '/profile/:id',
                templateUrl: 'app/user/userView.html',
                controller: 'UserViewController'
            });
    });
