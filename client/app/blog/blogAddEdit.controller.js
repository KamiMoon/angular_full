(function() {
    'use strict';

    angular.module('angularFullApp').controller('BlogAddEditController', BlogAddEditController);

    function BlogAddEditController($stateParams, $location, BlogService, Auth, Upload, ControllerUtil, CONSTANTS) {
        var action = $stateParams.action;
        var id = $stateParams.id;
        var user = Auth.getCurrentUser();
        var editor = $.summernote.eventHandler.getModule();

        var vm = this;
        vm.keywordToAdd = createKeywordRow();
        vm.deleteKeyword = deleteKeyword;
        vm.addKeyword = addKeyword;
        vm.save = save;
        vm.imageUpload = imageUpload;
        vm.getKeywords = getKeywords;
        vm.options = {
            tabsize: 2,
            // close prettify Html
            prettifyHtml: false
        };

        if (action === 'edit') {
            vm.post = BlogService.get({
                id: id
            });
        } else {
            vm.post = {
                user_id: user._id,
                user_name: user.name,
                keywords: []
            };
        }

        function createKeywordRow() {
            return {
                text: ''
            };
        }

        function deleteKeyword(keyword) {
            for (var i = 0; i < vm.post.keywords.length; i++) {
                if (vm.post.keywords[i].$$hashKey === keyword.$$hashKey) {
                    vm.post.keywords.splice(i, 1);
                    break;
                }
            }
        }

        function addKeyword() {
            vm.post.keywords.push(vm.keywordToAdd);
            vm.keywordToAdd = createKeywordRow();
        }

        function save(form) {
            var request;

            if (form.$valid) {

                if (action === 'edit') {
                    request = BlogService.update({
                        id: vm.post._id
                    }, vm.post).$promise;

                    ControllerUtil.handle(request, form).then(function() {
                        $location.path('/blog/' + id);
                    });
                } else {
                    request = BlogService.save(vm.post).$promise;

                    ControllerUtil.handle(request, form).then(function(data) {
                        $location.path('/blog/' + data._id);
                    });
                }
            }
        }

        function imageUpload(files) {
            uploadEditorImage(files);
        }

        function uploadEditorImage(files) {
            if (files) {
                angular.forEach(files, function(file) {
                    if (file) {
                        Upload.upload({
                            skipAuthorization: true,
                            url: CONSTANTS.CLOUDINARY_UPLOAD_URL,
                            fields: {
                                upload_preset: CONSTANTS.CLOUDINARY_UPLOAD_PRESET //,
                                    //tags: 'myphotoalbum',
                                    //context: 'photo=' + scope.title
                            },
                            file: file
                        }).success(function(data, status, headers, config) {
                            var file_location = data.secure_url;

                            //vm.editable.addClass('img-responsive');

                            editor.insertImage(vm.editable, file_location, file_location);
                        });
                    }
                });
            }
        }

        function getKeywords(val) {
            return BlogService.getKeywords({
                params: {
                    search: val
                }
            }).$promise.then(function(keywordObjs) {
                return keywordObjs.map(function(item) {
                    return item._id;
                });
            });
        }

    }

})();
