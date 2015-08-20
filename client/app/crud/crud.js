'use strict';

angular.module('angularFullApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/crud', {
        templateUrl: 'app/crud/crud.html',
        controller: 'CrudCtrl'
      });
  });
