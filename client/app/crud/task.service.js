(function() {
    'use strict';

    angular.module('angularFullApp')
        .factory('Task', Task);

    function Task($resource) {
        return $resource('/api/tasks/:id', {
            id: '@_id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }

})();
