/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 2:37 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('app', [
        'auth',
        'blog',
        'meta',
        'nav'
    ])

    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/meta/about/about.html',
            controller: 'meta.AboutCtrl',
            activeTab: 'about'
        });
        $routeProvider.otherwise({redirectTo: '/'});

//        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }])

    .value('version', '0.1')
    .value('_api', 'http://dev.maasive.net/SuperSpock/spencer');
