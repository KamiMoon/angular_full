(function() {
    'use strict';

    angular.module('angularFullApp').directive('bUpload', bUpload);

    function bUpload($rootScope, $timeout, Upload, CONSTANTS) {
        return {
            templateUrl: 'components/bInput/bUpload.directive.html',
            scope: {
                ngModel: '=',
                transformation: '@'
            },
            restrict: 'E',
            link: function(scope, element, attrs) {

                scope.uploadFile = function(file, errFiles) {
                    scope.f = file;
                    scope.errFile = errFiles && errFiles[0];
                    if (file) {
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

                                scope.resultUrl = url;
                                //set on the user API
                                scope.ngModel = public_id;

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
                };

                scope.remove = function() {
                    scope.f = null;
                    scope.errFile = null;
                    scope.errorMsg = null;
                    scope.ngModel = null;
                    scope.resultUrl = null;
                };

            }
        };
    }

})();
