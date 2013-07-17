/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 2:37 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('nav', [])

    .controller('NavCtrl', ['$scope', '$route', function($scope, $route) {
        // sets the route of the navigation controller's scope
        $scope.$route = $route;
    }]);