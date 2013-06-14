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
                load: ['Post', function(Post) {
                    return Post.query();
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
