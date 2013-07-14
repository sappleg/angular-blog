'use strict';

/* global _:false */

angular.module('app', [
        'auth',
        'blog',
        'meta',
        'nav'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/about.html',
            controller: 'meta.AboutCtrl',
            activeTab: 'about'
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])

    .value('version', '0.1')
    .value('_api', 'http://dev.maasive.net/SuperSpock/spencer');
