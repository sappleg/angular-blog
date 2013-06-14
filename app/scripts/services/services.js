'use strict';

/* Services */

angular.module('SpencerApplegateBlog.services', ['ngResource'])
    .factory('Post', ['$http', '$q', function($http, $q) {
        var Post = function(data) {
            angular.extend(this, {}, data);
        };

        Post.query = function() {
            var deferred = $q.defer();

            $http({method: 'GET', url: '/posts'})
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

            $http({method: 'GET', url: '/posts/' + params.id})
                .success(function(data) {
                    deferred.resolve(new Post(data));
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        };

        Post.save = function(post, callback) {
            $http({method: 'POST', url: '/posts', data: post})
                .success(callback)
                .error(function() {
                    console.log('There was an error creating your post');
                })
        };

        Post.update = function(params, post, callback) {
            $http({method: 'PUT', url: '/posts/' + params.id, data: post})
                .success(callback)
                .error(function() {
                    console.log('There was an error saving your post');
                });
        };

        Post.remove = function(params, callback) {
            $http({method: 'DELETE', url: '/posts/' + params.id})
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

    // current version of the application
    .value('version', '0.1');
