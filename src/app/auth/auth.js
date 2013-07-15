/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/11/13
 * Time: 9:53 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('auth', [
        'auth.login'])

    .factory('Auth', ['$http', '_api', function($http, _api) {

        return {
            loggedIn: false,
            login : function(data, callback) {
                $http({method: 'POST', url: _api + '/auth/login/', data: angular.toJson(data), withCredentials: true})
                    .success(function() {
                        callback();
                    })
                    .error(function() {
                        console.log('There was an error logging in');
                    });
            },

            logout : function(callback) {
                $http({method: 'GET', url: _api + '/auth/logout/'})
                    .success(function() {
                        callback();
                    })
                    .error(function() {
                        console.log('There was an error logging out');
                    });
            },

            setLoggedIn : function(isLoggedIn) {
                this.loggedIn = isLoggedIn;
            }
        };
    }]);
