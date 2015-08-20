'use strict';

angular.module('angularFullApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'btford.socket-io',
        'ui.bootstrap'
    ])
    .config(function($locationProvider) {

        $locationProvider.html5Mode(true);
    });