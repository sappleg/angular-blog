/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('comments.list', [])

    .controller('comments.ListCtrl', ['$scope', '$routeParams', '$location', 'Comment', function($scope, $routeParams, $location, Comment) {

        Comment.query({postId: $routeParams.id})
            .then(function(data) {
                $scope.comments = _.map(data, function(value) {
                    // TODO: abstract away the timestamp calculation from this controller to make more reusable
                    var timestamp = value.id.toString().substring(0, 8);
                    value.timestamp = new Date(parseInt(timestamp, 16) * 1000);

                    return value;
                });
            });

        $scope.destroy = function(comment) {
            Comment.remove({id: comment.id}, function() {
                $scope.comments = _.without($scope.comments, comment);
            })
        };
        
    }])