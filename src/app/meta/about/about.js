/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 1:52 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('meta.about', [])
    // About route Configuration is contained in app.js since it is the landing page

    .controller('meta.AboutCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
        $scope.auth = Auth;

        $scope.logout = function() {
            Auth.logout(function() {
                $scope.auth.setLoggedIn(false);
                $location.path('/');
            });
        };
    }])
