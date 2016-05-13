(function() {
    'use strict';

    angular.module('angularFullApp').component('bUpload', {
        templateUrl: 'components/bInput/bUpload.directive.html',
        bindings: {
            ngModel: '=',
            transformation: '@'
        },
        controller: bUpload,
        controllerAs: 'vm'
    });

    function bUpload($timeout, Upload, CONSTANTS) {
        var vm = this;
        vm.uploadFile = uploadFile;
        vm.remove = remove;

        function uploadFile(file, errFiles) {
            vm.f = file;
            vm.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    skipAuthorization: true,
                    url: CONSTANTS.CLOUDINARY_UPLOAD_URL,
                    fields: {
                        upload_preset: CONSTANTS.CLOUDINARY_UPLOAD_PRESET //,
                            //tags: 'myphotoalbum',
                            //context: 'photo=' + vm.title
                    },
                    file: file
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;

                        var public_id = file.result.public_id;

                        var url = CONSTANTS.CLOUDINARY_IMAGE_URL;

                        if (vm.transformation) {
                            url += vm.transformation + '/';
                        }

                        url += public_id + '.' + file.result.format;

                        vm.resultUrl = url;
                        //set on the user API
                        vm.ngModel = public_id;

                    });
                }, function(response) {
                    if (response.status > 0) {
                        vm.errorMsg = response.status + ': ' + response.data;
                    }
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        }

        function remove() {
            vm.f = null;
            vm.errFile = null;
            vm.errorMsg = null;
            vm.ngModel = null;
            vm.resultUrl = null;
        }
    }

})();
