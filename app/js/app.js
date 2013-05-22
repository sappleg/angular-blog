'use strict';

// Declare app level module which depends on filters, and services
angular.module('SpencerApplegateBlog', ['SpencerApplegateBlog.filters', 'SpencerApplegateBlog.services', 'SpencerApplegateBlog.directives', 'SpencerApplegateBlog.controllers'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
        $routeProvider.when('/blog', {templateUrl: 'partials/blog/list.html', controller: 'BlogCtrl'});
        $routeProvider.when('/blog/new/', {templateUrl: 'partials/blog/detail.html', controller: 'CreateCtrl'});
        $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'ContactCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
