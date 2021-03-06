(function() {
    'use strict';

    angular.module('angularFullApp')
        .factory('User', User);

    function User($resource) {
        return $resource('/api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            update: {
                method: 'PUT'
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            },
            profile: {
                method: 'GET',
                url: 'api/users/:id/profile'
            }
        });
    }

})();
