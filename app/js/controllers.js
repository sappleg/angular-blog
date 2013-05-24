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
    .controller('EditCtrl', ['$scope', '$routeParams', '$location', 'Post', function($scope, $routeParams, $location, Post) {
        var self = this;

        Post.get({id: $routeParams.postId}, function(post) {
            self.original = post;
            $scope.post = new Post(self.original);
        });

        $scope.isClean = function() {
            return angular.equals(self.original, $scope.post);
        };

        $scope.destroy = function() {
            self.original.destroy(function() {
                $location.path('/blog');
            })
        };

        $scope.save = function() {
            $scope.post.update(function() {
                $location.path('/blog');
            });
        };
    }])
    .controller('ContactCtrl', [function() {

    }]);