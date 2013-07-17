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
            templateUrl: 'app/blog/comments/edit/edit.html',
            controller: 'comments.EditCtrl',
            activeTab: 'blog'
        });
    }])

    .controller('comments.EditCtrl', ['$scope', '$location', '$routeParams', 'Comment', function($scope, $location, $routeParams, Comment) {

        $scope.save = function(comment) {
            $scope.comment = new Comment(comment);

            $scope.comment.postId = $routeParams.postId;

            Comment.save($scope.comment, function() {
                $location.path('/blog/' + $routeParams.postId);
            });
        };
    }])
