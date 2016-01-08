'use strict';

angular.module('angularFullApp')
    .service('SEOService', function($rootScope, CONSTANTS) {

        $rootScope.seo = {};

        var defaultImage = CONSTANTS.SEO_DEFAULTS.IMAGE;

        this.getDefaultSEO = function() {
            return {
                title: CONSTANTS.SEO_DEFAULTS.TITLE,
                description: CONSTANTS.SEO_DEFAULTS.DESCRIPTION,
                keywords: CONSTANTS.SEO_DEFAULTS.KEYWORDS,
                author: CONSTANTS.SEO_DEFAULTS.AUTHOR,
                url: window.location.href,
                type: 'article',
                image: defaultImage
            };
        };


        this.setSEO = function(seo) {

            //use whatever was left
            for (var property in seo) {
                if (property === 'image') {
                    $rootScope.seo.image = $rootScope.generateImage(seo.image, 'w_200,h_200,c_fill');
                } else {
                    $rootScope.seo[property] = seo[property];
                }
            }

        };

    });
