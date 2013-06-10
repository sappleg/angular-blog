'use strict';

/* App level modules */
/*global _:false */

angular.module('SpencerApplegateBlog', ['SpencerApplegateBlog.services', 'SpencerApplegateBlog.controllers', 'SpencerApplegateBlog.mockBackend', 'SpencerApplegateBlog.filters'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            activeTab: 'about'
        });
        $routeProvider.when('/blog', {
            templateUrl: 'views/blog/list.html',
            controller: 'BlogCtrl',
            activeTab: 'blog',
            resolve: {
                load: ['$q', 'Post', function($q, Post) {
                    var defer = $q.defer();
                    Post.query(function(successData) {
                        successData = _.map(successData, function(value) {
                            // TODO: abstract away the timestamp calculation from this controller to make more reusable
                            var timestamp = value.id.toString().substring(0, 8);
                            value.timestamp = new Date(parseInt(timestamp, 16) * 1000);
                            return value;
                        });
                        defer.resolve(successData);
                    }, function() {
                        defer.reject();
                    });

                    return defer.promise;
                }]
            }
        });
        $routeProvider.when('/blog/new/', {
            templateUrl: 'views/blog/detail.html',
            controller: 'CreateCtrl',
            activeTab: 'blog'
        });
        $routeProvider.when('/blog/:id', {
            templateUrl: 'views/blog/view.html',
            controller: 'ViewCtrl',
            activeTab: 'blog'
        });
//        $routeProvider.when('/blog/:postId/comments/new', {
//            templateUrl: 'views/blog/comments/detail.html',
//            controller: 'CreateCommentCtrl',
//            activeTab: 'blog'
//        });
        $routeProvider.when('/blog/edit/:id', {
            templateUrl: 'views/blog/detail.html',
            controller: 'EditCtrl',
            activeTab: 'blog'
        });
        $routeProvider.when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactCtrl',
            activeTab: 'contact'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
