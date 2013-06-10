'use strict';

/* Filters */

angular.module('SpencerApplegateBlog.filters', [])

    // gives the current version of the application
    .filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }])

    // reverses an array of items -- primarily used for blog posts and comments
    .filter('reverse', [function() {
        return function(items) {
            return items.slice().reverse();
        }
    }])

    // this filter will return the correct comments for a given post by comparing
    // the respective post id w/ all the comments postId's.  There MUST be a more
    // optimal way of doing this. [ ng-show was not working.  There is a commented
    // line in the view partial with my attempt at an implementation of it]
    .filter('comment', [function() {
        return function(comments, id) {
            return _.filter(comments, function(comment) {
                return comment.postId == id;
            })
        }
    }]);
