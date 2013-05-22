'use strict';

/* Controllers */

angular.module('SpencerApplegateBlog.controllers', [])
    .controller('AboutCtrl', [function() {

    }])
    .controller('BlogCtrl', ['$scope', 'Post', function($scope, Post) {
        $scope.posts = Post.query();
    }])
    .controller('CreateCtrl', ['$scope', '$location', 'Post', function($scope, $location, Post) {
        $scope.save = function() {
            $scope.post.timestamp = new Date();

            Post.save($scope.post, function() {
                $location.path('/blog');
            });
        };
    }])
    .controller('ContactCtrl', [function() {

    }]);