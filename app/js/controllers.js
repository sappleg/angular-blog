'use strict';

var posts = [];

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('AboutCtrl', [function() {

    }])
    .controller('BlogCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.posts = posts;

        $scope.save = function() {
            posts.push({title:$scope.post.title, body:$scope.post.body});
            $scope.posts.push.apply(posts);
            $location.path("/blog");
        };
    }])
    .controller('ContactCtrl', [function() {

    }]);