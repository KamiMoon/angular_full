(function() {
    'use strict';

    angular.module('angularFullApp').directive('bUploadMultiple', bUploadMultiple);

    function bUploadMultiple($rootScope, $timeout, Upload) {
        return {
            templateUrl: 'components/bInput/bUploadMultiple.directive.html',
            scope: {
                ngModel: '=',
                transformation: '@'
            },
            restrict: 'E',
            link: function(scope, element, attrs) {

                var unwatch = scope.$watch('ngModel', function(ngModel) {
                    if (ngModel) {
                        //initialize
                        if (scope.ngModel && scope.ngModel.length > 0 && !scope.files) {
                            scope.files = angular.copy(scope.ngModel);
                        }

                        unwatch(); //Remove the watch

                    }
                });

                scope.uploadFiles = function(files, errFiles) {
                    //reset ngModel
                    scope.ngModel = [];

                    scope.files = files;
                    scope.errFiles = errFiles;

                    angular.forEach(files, function(file) {

                        if (file && !file.$error) {

                            file.upload = Upload.upload({
                                skipAuthorization: true,
                                url: CONSTANTS.CLOUDINARY_UPLOAD_URL,
                                fields: {
                                    upload_preset: CONSTANTS.CLOUDINARY_UPLOAD_PRESET //,
                                        //tags: 'myphotoalbum',
                                        //context: 'photo=' + scope.title
                                },

                                file: file
                            });

                            file.upload.then(function(response) {
                                $timeout(function() {
                                    file.result = response.data;

                                    var public_id = file.result.public_id;

                                    var url = CONSTANTS.CLOUDINARY_IMAGE_URL;

                                    if (scope.transformation) {
                                        url += scope.transformation + '/';
                                    }

                                    url += public_id + '.' + file.result.format;

                                    //set on the user API
                                    if (scope.ngModel) {
                                        scope.ngModel.push(public_id);
                                    }


                                });
                            }, function(response) {
                                if (response.status > 0) {
                                    scope.errorMsg = response.status + ': ' + response.data;
                                }
                            }, function(evt) {
                                file.progress = Math.min(100, parseInt(100.0 *
                                    evt.loaded / evt.total));
                            });

                        }
                    });


                };

                scope.remove = function(index) {
                    scope.errorMsg = null;
                    scope.files.splice(index, 1);

                    if (scope.errFiles) {
                        scope.errFiles.splice(index, 1);
                    }

                    if (scope.ngModel) {
                        scope.ngModel.splice(index, 1);
                    }

                };

            }
        };
    }

})();
