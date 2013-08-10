/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/11/13
 * Time: 9:53 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('auth', [
        'auth.login',
        'ngCookies'
    ])

    .factory('Auth', ['$http', '$cookieStore', '_api', function($http, $cookieStore, _api) {

        return {
            loggedIn: $cookieStore.get('LoggedIn') || false,
            login: function(data, callback) {
                $http({method: 'POST', url: _api + '/auth/login/', data: angular.toJson(data), withCredentials: true})
                    .success(function() {
                        callback();
                    })
                    .error(function() {
                        console.log('There was an error logging in');
                    });
            },

            logout: function(callback) {
                $http({method: 'GET', url: _api + '/auth/logout/'})
                    .success(function() {
                        callback();
                    })
                    .error(function() {
                        console.log('There was an error logging out');
                    });
            },

            setLoggedIn: function(isLoggedIn) {
                $cookieStore.put('LoggedIn', isLoggedIn);
                this.loggedIn = isLoggedIn;
            }
        };
    }])

    .controller('auth.AuthCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
        $scope.auth = Auth;

        $scope.logout = function() {
            Auth.logout(function() {
                $scope.auth.setLoggedIn(false);
                $location.path('/');
            });
        };
    }]);