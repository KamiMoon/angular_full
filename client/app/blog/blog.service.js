'use strict';

angular.module('angularFullApp')
    .factory('BlogService', function($resource) {
        return $resource('/api/blog/:id/:controller', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                isArray: false
            }
        });
    });
