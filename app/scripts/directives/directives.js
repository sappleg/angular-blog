'use strict';

/* Directives */

angular.module('SpencerApplegateBlog.directives', [])

    // directive to show current application version
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]);
