'use strict';

/* App level modules */

angular.module('SpencerApplegateBlog', ['SpencerApplegateBlog.services', 'SpencerApplegateBlog.controllers', 'SpencerApplegateBlog.mockBackend', 'SpencerApplegateBlog.filters'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl',
            activeTab: 'about'
        });
        $routeProvider.when('/blog', {
            templateUrl: 'partials/blog/list.html',
            controller: 'BlogCtrl',
            activeTab: 'blog',
            resolve: {
                load: ['$q', 'Post', function($q, Post) {
                    var defer = $q.defer();
                    Post.query(function(successData) {
                        successData = _.map(successData, function(value, key, list) {
                            // TODO: abstract away the timestamp calculation from this controller to make more reusable
                            var timestamp = value.id.toString().substring(0, 8);
                            value["timestamp"] = new Date(parseInt(timestamp, 16) * 1000);
                            return value;
                        });
                        defer.resolve(successData);
                    }, function(errorData) {
                        defer.reject();
                    });

                    return defer.promise;
                }]
            }
        });
        $routeProvider.when('/blog/new/', {
            templateUrl: 'partials/blog/detail.html',
            controller: 'CreateCtrl',
            activeTab: 'blog'
        });
        $routeProvider.when('/blog/:id', {
            templateUrl: 'partials/blog/view.html',
            controller: 'ViewCtrl',
            activeTab: 'blog'
        });
//        $routeProvider.when('/blog/:postId/comments/new', {
//            templateUrl: 'partials/blog/comments/detail.html',
//            controller: 'CreateCommentCtrl',
//            activeTab: 'blog'
//        });
        $routeProvider.when('/blog/edit/:id', {
            templateUrl: 'partials/blog/detail.html',
            controller: 'EditCtrl',
            activeTab: 'blog'
        });
        $routeProvider.when('/contact', {
            templateUrl: 'partials/contact.html',
            controller: 'ContactCtrl',
            activeTab: 'contact'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);