/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/20/13
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('Blog posts and comments', function() {
    var array;

    beforeEach(function() {
        module('blog');
        array = [0, 1, 2, 3];
    });

    it('should be in reverse created order', inject(function(reverseFilter) {
        expect(reverseFilter(array)).toBe([3, 2, 1, 0]);
    }));
})