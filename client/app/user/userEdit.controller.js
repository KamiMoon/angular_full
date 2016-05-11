(function() {
    'use strict';

    angular.module('angularFullApp').controller('UserEditController', UserEditController);

    function UserEditController($location, $stateParams, User, ControllerUtil) {
        var id = $stateParams.id;

        var vm = this;
        vm.user = User.profile({ id: id });
        vm.save = save;

        function save(form) {

            if (form.$valid) {

                var request = User.update({
                    id: id
                }, vm.user).$promise;

                ControllerUtil.handle(request, form).then(function() {
                    $location.path('/profile/' + id);
                });
            }

        }

    }

})();
