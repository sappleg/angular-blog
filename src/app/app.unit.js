/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/20/13
 * Time: 5:22 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('app', function() {

    beforeEach(module('app'));

    it('should interpolate the version number in strings with the correct qualifier', inject(function(interpolateFilter) {
        expect(interpolateFilter('%VERSION%')).toBe('0.1');
    }));

    it('should provide a version and Maasive api', inject(function(version, _api) {
        expect(version).toBe('0.1');
        expect(_api).toBe('http://dev.maasive.net/SuperSpock/spencer');
    }));

    it('should override a version and test the new version is injected', function() {
        module(function($provide) {
            $provide.value('version', 'overridden'); // override version here
        });

        inject(function(version) {
            expect(version).toBe('overridden');
        });
    });
});