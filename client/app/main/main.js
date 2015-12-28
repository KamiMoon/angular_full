'use strict';

angular.module('angularFullApp')
    .config(function($stateProvider) {

        $stateProvider.state('/', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        }).state('contact', {
            url: '/contact',
            templateUrl: 'app/main/contact.html',
            controller: 'ContactCtrl'
        }).state('portfolio', {
            url: '/portfolio',
            templateUrl: 'app/main/portfolio.html'
        });
    });
