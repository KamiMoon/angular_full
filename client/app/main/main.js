'use strict';

angular.module('angularFullApp')
    .config(function($stateProvider) {

        $stateProvider.state('/', {
            url: '/',
            templateUrl: 'app/main/main.html'
        }).state('contact', {
            url: '/contact',
            templateUrl: 'app/main/contact.html',
            controller: 'ContactController',
            controllerAs: 'vm'
        }).state('portfolio', {
            url: '/portfolio',
            templateUrl: 'app/main/portfolio.html'
        });
    });
