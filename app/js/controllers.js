'use strict';

/* Controllers */

angular.module('SpencerApplegateBlog.controllers', [])

    // navigation control to keep track of active tab
    .controller('NavCtrl', ['$scope', '$route', function($scope, $route) {

        // sets the route of the navigation controller's scope
        $scope.$route = $route;
    }])

    // about page control
//    .controller('AboutCtrl', ['$scope', function($scope) {
//
//    }])

    // blog page control
    .controller('BlogCtrl', ['$scope', '$location', '$routeParams', 'Post', function($scope, $location, $routeParams, Post) {

        // pulls all posts from the db to display on the /blog page
        $scope.posts = Post.query();
        console.log($scope.posts);

        // redirects to viewing mode of blog post
//        $scope.view = function(id) {
//            $location.path('/blog/' + id );
//        };
    }])

    // create blog post page control
//    .controller('CreateCtrl', ['$scope', '$location', 'Post', function($scope, $location, Post) {
//
//        // saves the newly created post
//        // NOTE: NEED FURTHER EXPLANATION
//        $scope.save = function() {
//
//            // adds a timestamp to the created post object
//            $scope.post.timestamp = new Date();
//
//            Post.save($scope.post, function() {
//
//                // relocate to the blog page after saving the post
//                $location.path('/blog');
//            });
//        };
//    }])
//
//    // edit blog post control
    .controller('EditCtrl', ['$scope', '$routeParams', '$location', 'Post', function($scope, $routeParams, $location, Post) {
        // define local self variable
        var self = this;

        // grabs the correct post object based on id
//        Post.get($routeParams.postId, function(post) {
//            self.original = post;
//            $scope.post = new Post(self.original);
//        });
        $scope.post = Post.getPost($routeParams.postId);
//        console.log($scope.post);

        // checks to see if the post in the details page has been changed
//        $scope.isClean = function() {
//            return angular.equals(self.original, $scope.post);
//        };

        // deletes post object and redirects to main blog page
//        $scope.destroy = function() {
//            self.original.destroy(function() {
//                $location.path('/blog');
//            })
//        };

        // saves post object and redirects to main blog page
//        $scope.save = function() {
//            $scope.post.update(function() {
//                $location.path('/blog');
//            });
//        };
    }]);
//
//    // view post page control
//    .controller('ViewCtrl', ['$scope', '$routeParams', 'Post', 'Comment', function($scope, $routeParams, Post, Comment) {
//
//        $scope.comments = Comment.query();
//
//        Post.get({id: $routeParams.postId}, function(post) {
//            $scope.post = new Post(post);
//        });
//
//    }])
//
//    // create blog post page control
//    .controller('CreateCommentCtrl', ['$scope', '$location', '$routeParams', 'Comment', function($scope, $location, $routeParams, Comment) {
//
//        // saves the newly created post
//        // NOTE: NEED FURTHER EXPLANATION
//        $scope.save = function() {
//
//            // adds a timestamp and post id to the created post object
//            $scope.comment.timestamp = new Date();
//            $scope.comment.postId = $routeParams.postId;
//
//            Comment.save($scope.comment, function() {
//
//                // relocate to the blog page after saving the post
//                $location.path('/blog/' + $routeParams.postId);
//            });
//        };
//    }])
//
//    // contact page control
//    .controller('ContactCtrl', ['$scope', function($scope) {
//
//    }]);