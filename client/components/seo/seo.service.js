'use strict';

angular.module('angularFullApp')
    .service('SEOService', function($rootScope) {

        $rootScope.seo = {};

        var defaultImage = 'http://www.erickizaki.com/assets/eric_kizaki.jpg';

        this.getDefaultSEO = function() {
            return {
                title: 'erickizaki.com',
                description: 'Portfolio Website of Eric Kizaki',
                keywords: 'Eric Kizaki, HTML5, CSS3, JavaScript, MEAN, AngularJS, Node.js, MongoDB',
                author: 'Eric Kizaki',
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
