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
    }]);
