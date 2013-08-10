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
                load: ['$route', 'Post', 'Comment', function($route, Post, Comment) {
                    // TODO: refactor this to not access $route, may need to rethink resolve approach
                    return Post.get({id: $route.current.pathParams.id})
                        .then(function(post) {
                            // TODO: abstract away the timestamp calculation from this controller to make more reusable
                            var timestamp = post.id.toString().substring(0, 8);
                            post.timestamp = new Date(parseInt(timestamp, 16) * 1000);

                        return post;
                    });

                }]
            }
        });
    }])

    .controller('posts.ViewCtrl', ['$scope', 'load', 'Auth', function($scope, load, Auth) {
        $scope.post = load;

        $scope.auth = Auth;
    }])