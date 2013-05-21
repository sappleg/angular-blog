'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
        $routeProvider.when('/blog', {templateUrl: 'partials/blog.html', controller: 'BlogCtrl'});
        $routeProvider.when('/blog/new', {templateUrl: 'partials/newPost.html', controller: 'NewPostCtrl'});
        $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'ContactCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
