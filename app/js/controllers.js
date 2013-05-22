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
            Post.save($scope.post, function(post) {
                $location.path('/blog');
            });
        };
    }])
    .controller('ContactCtrl', [function() {

    }]);