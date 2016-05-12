(function() {
    'use strict';

    angular.module('angularFullApp')
        .directive('bFeedback', bFeedback);

    function bFeedback() {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            template: '<div ng-if="bFeedbackMessage && bFeedbackMessage.length > 0" ' +
                'class="alert alert-{{bFeedbackMessageClass}} alert-dismissible" role="alert">{{bFeedbackMessage}}' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span></button></div>'
        };
    }

})();
