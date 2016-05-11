'use strict';

angular.module('angularFullApp')
    .factory('BlogService', function($resource) {
        return $resource('/api/blog/:id/:controller', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query: {
                isArray: false
            },
            publishToMailingList: {
                method: 'GET',
                url: '/api/blog/publish/:id'
            },
            getKeywords: {
                method: 'GET',
                url: '/api/blog/keywords',
                isArray: true
            },
            getMailingListTotal: {
                method: 'GET',
                url: '/api/blog/getMailListTotal',
                isArray: false
            },
            subscribeToMailingList: {
                method: 'GET',
                url: '/api/blog/subscribe/:email'
            },
            getListOfPosts: {
                method: 'GET',
                url: '/api/blog/list',
                isArray: true
            }
        });
    });
