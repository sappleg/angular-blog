/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/11/13
 * Time: 10:11 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

angular.module('blog', [
        'blog.posts',
        'blog.comments'
    ])

    // TODO: filter on timestamp instead of initial position
    .filter('reverse', [function() {
        return function(items) {
            return items.slice().reverse();
        };
    }]);