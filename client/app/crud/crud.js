'use strict';

angular.module('angularFullApp')
    .config(function($stateProvider) {

        $stateProvider.state('crud', {
            url: '/crud',
            templateUrl: 'app/crud/crud.html',
            controller: 'CrudCtrl'
        });
    });
