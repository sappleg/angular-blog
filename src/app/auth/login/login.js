/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 11:21 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('auth.login', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/auth/login/login.html',
            controller: 'login.LoginCtrl',
            activeTab: 'about'
        });
    }])

    .controller('login.LoginCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
        $scope.auth = Auth;

        $scope.login = function() {
            Auth.login({"email": $scope.email, "password": $scope.password}, function() {
                $scope.auth.setLoggedIn(true);
                $location.path('/');
            });
        }
    }])
