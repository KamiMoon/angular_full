'use strict';

angular.module('angularFullApp')
    .directive('blogFollow', function(ControllerUtil, ValidationService, $http) {
        return {
            templateUrl: 'app/blog/blog.follow.html',
            restrict: 'E',
            link: function postLink($scope, $element, attrs) {

                $scope.follow = {
                    followers: 0,
                    email: ''
                };


                function getMailListTotal() {
                    $http.get('/api/blog/getMailListTotal').then(function(results) {
                        $scope.follow.followers = results.data;
                    });
                }

                getMailListTotal();

                $scope.save = function(form) {
                    if (ControllerUtil.validate($scope, form)) {

                        $http.get('/api/blog/subscribe/' + $scope.follow.email).then(function(results) {
                            ValidationService.success('You have been added to the mailing list');

                            getMailListTotal();
                        });

                    }
                };
            }
        };
    });
