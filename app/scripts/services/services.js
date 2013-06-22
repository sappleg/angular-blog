'use strict';

/* Services */

angular.module('SpencerApplegateBlog.services', ['ngResource', 'ngCookies'])
    .factory('Post', ['$http', '$q', '_api', function($http, $q, _api) {
        var Post = function(data) {
            angular.extend(this, data);
        };

        Post.query = function() {
            var deferred = $q.defer();

            $http({method: 'GET', url: _api+ '/posts/'})
                .success(function(data) {
                    data = _.map(data, function(value) {
                        // TODO: abstract away the timestamp calculation from this controller to make more reusable
                        var timestamp = value.id.toString().substring(0, 8);
                        value.timestamp = new Date(parseInt(timestamp, 16) * 1000);
                        return value;
                    });

                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        };

        Post.get = function(params) {
            var deferred = $q.defer();

            $http({method: 'GET', url: _api + '/posts/' + params.id})
                .success(function(data) {
                    deferred.resolve(new Post(data));
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        };

        Post.save = function(post, callback) {
            $http({method: 'POST', url: _api + '/posts', data: post})
                .success(callback)
                .error(function() {
                    console.log('There was an error creating your post');
                })
        };

        Post.update = function(params, post, callback) {
            $http({method: 'PUT', url: _api + '/posts/' + params.id, data: post})
                .success(callback)
                .error(function() {
                    console.log('There was an error saving your post');
                });
        };

        Post.remove = function(params, callback) {
            $http({method: 'DELETE', url: _api + '/posts/' + params.id})
                .success(callback)
                .error(function() {
                    console.log('There was an error deleting your post');
                });
        };

        Post.prototype.update = function(callback) {
            return Post.update({id: this.id}, this, callback);
        };

        Post.prototype.destroy = function(callback) {
            return Post.remove({id: this.id}, callback);
        };

        return Post;
    }])

    .factory('Comment', ['$http', '$q', '_api', function($http, $q, _api) {
        var Comment = function(data) {
            angular.extend(this, data);
        };

        Comment.save = function(comment, callback) {
            $http({method: 'POST', url: _api + '/comments', data: comment})
                .success(callback)
                .error(function() {
                    console.log('There was an error saving the comment');
                });
        };

        Comment.remove = function(params, callback) {
            $http({method: 'DELETE', url: _api + '/comments/' + params.id, withCredentials: true})
                .success(callback)
                .error(function() {
                    console.log('There was an error deleting the comment');
                });
        };

        Comment.prototype.destroy = function(callback) {
            return Comment.remove({id: this.id}, callback);
        };

        return Comment;
    }])

    .factory('Login', ['$http', '$cookies', '_api', function($http, $cookies, _api) {
        var Login = function(data) {
            angular.extend(this, data);
        };

        Login.login = function(data, callback) {
            $http({method: 'POST', url: _api + '/auth/login/', data: angular.toJson(data), withCredentials: true})
                .success(function(data, status, headers) {
                    console.log(headers(''));
                    callback();
                })
                .error(function() {
                    console.log('There was an error logging in');
                });
        };
        
        Login.logout = function(callback) {
            $http({method: 'GET', url: _api + '/auth/logout/'})
                .success(function(successData) {
                    console.log(successData);
                    callback();
                })
                .error(function() {
                    console.log('There was an error logging out');  
                });
        };

        return Login;
    }])

        // current version of the application
    .value('version', '0.1')
    .value('_api', 'http://dev.maasive.net/SuperSpock/spencer');
