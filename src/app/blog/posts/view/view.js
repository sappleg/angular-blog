/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('posts.view', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/blog/:id', {
            templateUrl: 'app/blog/posts/view/view.html',
            controller: 'posts.ViewCtrl',
            activeTab: 'blog',
            resolve: {
                load: ['$route', 'Post', function($route, Post) {
                    // TODO: refactor this to not access $route, may need to rethink resolve approach
                    return Post.get({id: $route.current.pathParams.id}).then(function(post) {
                        post.comments = _.map(post.comments, function(value, key) {
                            // TODO: move this functionality to comments
                            var timestamp = key.toString().substring(0, 8);
                            value.timestamp = new Date(parseInt(timestamp, 16) * 1000);
                            value.id = key; // Added after josh removed id's on objects with /posts/ GET
                            return value;
                        });

                        return post;
                    });

                }]
            }
        });
    }])

    .controller('posts.ViewCtrl', ['$scope', '$routeParams', 'load', 'Comment', 'Post', 'Auth', function($scope, $routeParams, load, Comment, Post, Auth) {
        // TODO: move this to a resolve service on routeProvider
        $scope.post = load;

        // expose Auth to the scope
        $scope.auth = Auth;

        $scope.destroy = function(id) {
            Comment.remove({id: id}, function() {
                Post.get({id: $routeParams.id}).then(function(post) {
                    $scope.post.comments = _.map(post.comments, function(value) {
                        return value;
                    });
                });
            });
        };
    }])