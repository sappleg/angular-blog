/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('posts.list', [])
    .config('$routeProvider', function($routeProvider) {
        $routeProvider.when('/blog', {
            templateUrl: 'list.html',
            controller: 'posts.ListCtrl',
            activeTab: 'blog',
            resolve: {
                load: ['Post', function(Post) {
                    return Post.query();
                }]
            }
        });
    })

    .controller('posts.ListCtrl', ['$scope', '$location', 'load', 'Auth', function($scope, $location, load, Auth) {
        // sets posts on scope as return from promise object in routeProvider's resolve
        $scope.posts = load;

        // expose Auth to the scope
        $scope.auth = Auth;

        // redirects to viewing mode of blog post
        $scope.view = function(id) {
            $location.path('/blog/' + id);
        };
    }])