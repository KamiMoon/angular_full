'use strict';


var loadCommentCount = function() {
    window.disqus_shortname = 'erickizakicom';

    if (!window.DISQUSWIDGETS) {
        $('head').append('<script id="dsq-count-scr" src="//erickizakicom.disqus.com/count.js?" async></script>');
    } else {
        window.DISQUSWIDGETS.getCount({
            reset: true

        });
    }
};


angular.module('angularFullApp').controller('BlogCtrl', function($scope, $stateParams, BlogService, $timeout) {

    $scope.searchParams = {
        page: 1,
        itemsPerPage: 10,
        totalItems: 0
    };

    if ($stateParams.keyword) {
        $scope.searchParams['keywords.text'] = $stateParams.keyword;
    }

    //paging https://angular-ui.github.io/bootstrap/#/pagination
    var runQuery = function() {

        BlogService.query($scope.searchParams).$promise.then(function(postWrapper) {
            $scope.posts = postWrapper.posts;

            $scope.searchParams.page = postWrapper.paging.page;
            $scope.searchParams.itemsPerPage = postWrapper.paging.itemsPerPage;
            $scope.searchParams.totalItems = postWrapper.paging.totalItems;

            $timeout(function() {
                $timeout(function() {
                    loadCommentCount();
                });
            });

        });
    };

    $scope.pageChanged = function() {
        runQuery();
    };

    runQuery();

}).controller('BlogAddEditCtrl', function($scope, $stateParams, $location, BlogService, ValidationService, Auth, Upload, ControllerUtil, $http) {
    var action = $stateParams.action;
    var id = $stateParams.id;
    var user = Auth.getCurrentUser();

    if (action === 'edit') {
        $scope.post = BlogService.get({
            id: id
        });
    } else {
        $scope.post = {
            user_id: user._id,
            user_name: user.name,
            keywords: []
        };
    }

    var createKeywordRow = function() {
        return {
            text: ''
        };
    };

    $scope.keywordToAdd = createKeywordRow();

    $scope.deleteKeyword = function(keyword) {
        for (var i = 0; i < $scope.post.keywords.length; i++) {
            if ($scope.post.keywords[i].$$hashKey === keyword.$$hashKey) {
                $scope.post.keywords.splice(i, 1);
                break;
            }
        }
    };

    $scope.addKeyword = function() {
        $scope.post.keywords.push($scope.keywordToAdd);

        $scope.keywordToAdd = createKeywordRow();
    };

    $scope.save = function(form) {
        var request;

        if (ControllerUtil.validate($scope, form)) {

            if (action === 'edit') {
                request = BlogService.update({
                    id: $scope.post._id
                }, $scope.post).$promise;

                ControllerUtil.handle(request, form).then(function() {
                    $location.path('/blog/' + id);
                });
            } else {
                request = BlogService.save($scope.post).$promise;

                ControllerUtil.handle(request, form).then(function(data) {
                    $location.path('/blog/' + data._id);
                });
            }
        }
    };

    $scope.imageUpload = function(files) {
        uploadEditorImage(files);
    };

    var editor = $.summernote.eventHandler.getModule();

    function uploadEditorImage(files) {
        if (files) {
            angular.forEach(files, function(file) {
                if (file) {
                    Upload.upload({
                        skipAuthorization: true,
                        url: "https://api.cloudinary.com/v1_1/" + "ddovrks1z" + "/upload",
                        fields: {
                            upload_preset: 'saogp2ap' //,
                                //tags: 'myphotoalbum',
                                //context: 'photo=' + scope.title
                        },

                        file: file
                    }).success(function(data, status, headers, config) {
                        var file_location = data.secure_url;

                        //$scope.editable.addClass('img-responsive');

                        editor.insertImage($scope.editable, file_location, file_location);
                    });
                }
            });
        }
    }

    $scope.getKeywords = function(val) {
        return $http.get('/api/blog/keywords', {
            params: {

                search: val
            }
        }).then(function(response) {
            return response.data.map(function(item) {
                return item._id;
            });
        });
    };

    $scope.options = {
        tabsize: 2,
        // close prettify Html
        prettifyHtml: false
    };

}).controller('BlogViewCtrl', function($scope, SEOService, $timeout, $stateParams, Auth, BlogService, ValidationService, $location, ControllerUtil, $http) {

    var id = $stateParams.id;
    $scope.contentLoaded = false;

    BlogService.get({
        id: id
    }).$promise.then(function(post) {
        $scope.post = post;
        $scope.contentLoaded = true;

        SEOService.setSEO({
            title: post.title,
            description: post.headingQuote,
            author: post.user_name,
            image: post.photo
        });

        $timeout(function() {
            $timeout(function() {
                loadCommentCount();
            });
        });
    });

    $scope.delete = function() {
        ControllerUtil.delete(id, BlogService, '/blog');
    };

    $scope.publishToMailingList = function(id) {
        $http.get('/api/blog/publish/' + id).then(function(results) {
            ValidationService.success('Article Published.');
        });
    };

});
