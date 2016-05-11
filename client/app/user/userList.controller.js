(function() {
    'use strict';

    angular.module('angularFullApp').controller('UserListController', UserListController);

    function UserListController(User, ValidationService) {
        var vm = this;

        vm.users = User.query();
        vm.searchParams = {};
        vm.search = search;
        vm.delete = deleteFn;

        function search() {
            vm.users = User.query(vm.searchParams);
        }

        function deleteFn(id) {
            if (id) {

                var r = confirm('Are you sure you want to delete?');
                if (r == true) {
                    User.delete({
                        id: id
                    }).$promise.then(function() {
                        ValidationService.success();

                        angular.forEach(vm.users, function(obj, i) {
                            if (obj._id === id) {
                                vm.users.splice(i, 1);
                            }
                        });

                    }, function() {
                        ValidationService.error('Delete Failed');
                    });
                }

            }
        }

    }

})();
