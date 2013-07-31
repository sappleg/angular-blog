/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/11/13
 * Time: 10:22 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('blog.posts', [
        'posts.edit',
        'posts.list',
        'posts.view'])

    .factory('Post', ['$http', '$q', '$location', '_api', function($http, $q, $location, _api) {
        var Post = function(data) {
            angular.extend(this, data);
        };

        Post.query = function() {
            var deferred = $q.defer();

            $http({method: 'GET', url: _api+ '/posts/'})
                .success(function(data) {
                    // TODO: abstract away the timestamp calculation from this controller to make more reusable
                    angular.forEach(data, function(value) {
                        var timestamp = value.id.toString().substring(0, 8);
                        value.timestamp = new Date(parseInt(timestamp, 16) * 1000);
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
            $http({method: 'POST', url: _api + '/posts/', data: post, withCredentials: true})
                .success(function() {
                    callback();
                })
                .error(function() {
                    console.log('There was an error creating your post');
                })
        };

        Post.update = function(params, post, callback) {
            $http({method: 'PUT', url: _api + '/posts/' + params.id, data: post, withCredentials: true})
                .success(function() {
                    callback();
                })
                .error(function() {
                    console.log('There was an error saving your post');
                });
        };

        Post.remove = function(params, callback) {
            $http({method: 'DELETE', url: _api + '/posts/' + params.id, withCredentials: true})
                .success(function() {
                    callback();
                })
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