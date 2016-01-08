'use strict';

angular.module('angularFullApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.mask',
        'ngTouch',
        'ngFileUpload',
        'ngStorage',
        'vcRecaptcha',
        'summernote',
        'cloudinary',
        'angularUtils.directives.dirDisqus',
        'ui.bootstrap'

    ])
    .constant('CONSTANTS', {
        'CLOUDINARY_IMAGE_URL': 'http://res.cloudinary.com/ddovrks1z/image/upload/',
        'CLOUDINARY_UPLOAD_URL': 'https://api.cloudinary.com/v1_1/ddovrks1z/upload',
        'CLOUDINARY_UPLOAD_PRESET': 'saogp2ap',
        'SEO_DEFAULTS': {
            'IMAGE': 'http://www.erickizaki.com/assets/eric_kizaki.jpg',
            'TITLE': 'erickizaki.com',
            'DESCRIPTION': 'Portfolio Website of Eric Kizaki',
            'KEYWORDS': 'Eric Kizaki, HTML5, CSS3, JavaScript, MEAN, AngularJS, Node.js, MongoDB',
            'AUTHOR': 'Eric Kizaki'
        },
        'DISQUS': {
            'SHORTNAME': 'erickizakicom'
        }
    })
    .config(function($locationProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $httpProvider.interceptors.push('authInterceptor');
    })
    .factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function(config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token') && !config.skipAuthorization) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    })
    .run(function($rootScope, $location, $timeout, Auth, SEOService, CONSTANTS) {
        $rootScope.Auth = Auth;
        $rootScope.CONSTANTS = CONSTANTS;

        $rootScope.generateImage = function(cloudinaryId, transform) {

            if (transform) {
                transform = transform + '/';
            } else {
                transform = '';
            }

            return CONSTANTS.CLOUDINARY_IMAGE_URL + transform + cloudinaryId + '.png';
        };

        //Defaults
        SEOService.setSEO(SEOService.getDefaultSEO());

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function(event, next, toParams, fromState, fromParams) {
            Auth.isLoggedInAsync(function(loggedIn) {
                if ((next.authenticate || next.roles) && !loggedIn) {
                    event.preventDefault();


                    $timeout(function() {
                        $location.path('/login');
                    });
                } else if (next.roles && !Auth.hasRoles(next.roles)) {
                    event.preventDefault();
                    $timeout(function() {
                        $location.path('/notAuthorized').replace();
                    });
                }

                /*
                if (next.isOrgAdminFor && toParams[next.isOrgAdminFor] && !Auth.isOrgAdminFor(toParams[next.isOrgAdminFor])) {
                    event.preventDefault();
                    return $location.path('/notAuthorized').replace();
                }
                */
            });
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $('html, body').scrollTop(0);

            SEOService.setSEO(SEOService.getDefaultSEO());

            $timeout(function() {
                $timeout(function() {
                    window.prerenderReady = true;
                });
            });


        });

        //TODO make this a directive
        $rootScope.loadCommentCount = function() {
            window.disqus_shortname = CONSTANTS.DISQUS.SHORTNAME;

            if (!window.DISQUSWIDGETS) {
                //TODO - configurable
                $('head').append('<script id="dsq-count-scr" src="//' + CONSTANTS.DISQUS.SHORTNAME + '.disqus.com/count.js?" async></script>');
            } else {
                window.DISQUSWIDGETS.getCount({
                    reset: true

                });
            }
        };

    });
