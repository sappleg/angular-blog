/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/11/13
 * Time: 10:22 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('blog.comments', [
        'comments.edit',
        'comments.list'])

    .filter('comment', [function() {
        return function(comments, id) {
            return _.filter(comments, function(comment) {
                return comment.postId == id;
            })
        }
    }])

    .factory('Comment', ['$http', '$q', '_api', function($http, $q, _api) {
        var Comment = function(data) {
            angular.extend(this, data);
        };

        Comment.query = function(params) {
            var deferred = $q.defer();

            $http({method: 'GET', url: _api + '/posts/' + params.postId + '/comments/'})
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        };

        Comment.save = function(comment, callback) {
            $http({method: 'POST', url: _api + '/comments/', data: comment})
                .success(function() {
                    callback();
                })
                .error(function() {
                    console.log('There was an error saving the comment');
                });
        };

        Comment.remove = function(params, callback) {
            $http({method: 'DELETE', url: _api + '/comments/' + params.id, withCredentials: true})
                .success(function() {
                    callback();
                })
                .error(function() {
                    console.log('There was an error deleting the comment');
                });
        };

        Comment.prototype.destroy = function(callback) {
            return Comment.remove({id: this.id}, callback);
        };

        return Comment;
    }])