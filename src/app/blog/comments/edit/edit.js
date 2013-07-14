/**
 *
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('comments.edit', [])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/blog/:postId/comments/new', {
            templateUrl: 'views/blog/comments/edit.html',
            controller: 'CreateCommentCtrl',
            activeTab: 'blog'
        });
    }])

    .controller('CreateCommentCtrl', ['$scope', '$location', '$routeParams', 'Comment', function($scope, $location, $routeParams, Comment) {

        // saves the newly created post
        $scope.save = function() {

            // adds a timestamp and post id to the created post object
            $scope.comment.timestamp = new Date();
            $scope.comment.postId = $routeParams.postId;
            $scope.comment.parentId = "";

            Comment.save($scope.comment, function() {
                // relocate to the blog page after saving the post
                $location.path('/blog/' + $routeParams.postId);
            });
        };
    }])
