(function() {
    'use strict';

    angular.module('angularFullApp')
        .factory('ContactService', ContactService);

    function ContactService($http) {
        return {
            sendContactMessage: function(contact) {
                return $http.post('api/contacts/contactus', contact);
            }
        }
    }

})();
