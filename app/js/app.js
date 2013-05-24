'use strict';

/* App level modules */

angular.module('SpencerApplegateBlog', ['SpencerApplegateBlog.filters', 'SpencerApplegateBlog.services', 'SpencerApplegateBlog.directives', 'SpencerApplegateBlog.controllers'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl',
            activeTab: 'about'});
        $routeProvider.when('/blog', {
            templateUrl: 'partials/blog/list.html',
            controller: 'BlogCtrl',
            activeTab: 'blog'});
        $routeProvider.when('/blog/new/', {
            templateUrl: 'partials/blog/detail.html',
            controller: 'CreateCtrl',
            activeTab: 'blog'});
        $routeProvider.when('/blog/edit/:postId', {
            templateUrl: 'partials/blog/detail.html',
            controller: 'EditCtrl',
            activeTab: 'blog'});
        $routeProvider.when('/contact', {
            templateUrl: 'partials/contact.html',
            controller: 'ContactCtrl',
            activeTab: 'contact'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);