/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/20/13
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('filter', function() {
    var array;

    beforeEach(function() {
        module('blog');
        array = [0,1,2,3];
    });

    describe('reverse', function() {
        it('should reverse the order of elements in an array', inject(function(reverseFilter) {
            var reversedArray = reverseFilter(array);

            expect(reversedArray[0]).toBe(3);
            expect(reversedArray[1]).toBe(2);
            expect(reversedArray[2]).toBe(1);
            expect(reversedArray[3]).toBe(0);
        }));
    });
})