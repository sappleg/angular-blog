/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('comments.list', [])

    .controller('comments.ListCtrl', ['$scope', '$routeParams', 'Comment', function($scope, $routeParams, Comment) {
        $scope.comments = Comment.query({postId: $routeParams.id});
    }])