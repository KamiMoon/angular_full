'use strict';

angular.module('angularFullApp')
    .factory('Task', function($resource) {
        return $resource('/api/tasks/:id', {
            id: '@_id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    });