'use strict';

angular.module('angularFullApp')
    .config(function($routeProvider) {
        $routeProvider
            .when('/webglyard', {
                controller: function() {
                    window.location.replace('/webglyard');
                },
                template: "<div></div>"
            });
    });