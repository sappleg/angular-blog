/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('posts.edit', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/blog/new/', {
            templateUrl: 'views/blog/edit.html',
            controller: 'CreateCtrl',
            activeTab: 'blog'
        });
        $routeProvider.when('/blog/edit/:id', {
            templateUrl: 'views/blog/edit.html',
            controller: 'EditCtrl',
            activeTab: 'blog'
        });
    }])

    .controller('CreateCtrl', ['$scope', '$location', 'Post', function($scope, $location, Post) {
        // saves the newly created post
        $scope.save = function() {
            Post.save($scope.post, function() {
                $location.path('/blog');
            });
        };
    }])

    .controller('EditCtrl', ['$scope', '$routeParams', '$location', 'Post', function($scope, $routeParams, $location, Post) {
        // define local self variable
        var self = this;

        // grabs the correct post object based on id
        Post.get({id: $routeParams.id}).then(function(post) {
            self.original = post;
            $scope.post = new Post(self.original);
        });

        // checks to see if the post in the details page has been changed
        $scope.isClean = function() {
            return angular.equals(self.original, $scope.post);
        };

        // save edited blog post
        $scope.save = function() {
            $scope.post.update(function() {
                $location.path('/blog');
            });
        };

        // deletes post object and redirects to main blog page
        $scope.destroy = function() {
            self.original.destroy(function() {
                $location.path('/blog');
            })
        };
    }])
