'use strict';

angular.module('angularFullApp')
    .config(function($stateProvider) {
        $stateProvider.state('blogList', {
            url: '/blog',
            templateUrl: 'app/blog/blogList.html',
            controller: 'BlogListController',
            controllerAs: 'vm'
        }).state('blogAddEdit', {
            url: '/blog/:action/:id',
            templateUrl: 'app/blog/blogAdd.html',
            controller: 'BlogAddEditController',
            controllerAs: 'vm',
            roles: ['admin', 'blogger']
        }).state('blogView', {
            url: '/blog/:id',
            templateUrl: 'app/blog/blogView.html',
            controller: 'BlogViewController',
            controllerAs: 'vm'
        }).state('blogKeyword', {
            url: '/blogKeyword/:keyword',
            templateUrl: 'app/blog/blogList.html',
            controller: 'BlogListController',
            controllerAs: 'vm'
        });
    });
