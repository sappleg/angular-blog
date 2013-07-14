/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 11:15 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('meta.contact', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'contact.html',
            controller: 'meta.ContactCtrl',
            activeTab: 'contact'
        });
    }])

    .controller('meta.ContactCtrl', ['$scope', function($scope) {

    }])

