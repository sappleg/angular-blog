/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/20/13
 * Time: 6:42 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('auth', function() {
    var $httpBackend, Auth, callback, api;

    beforeEach(function() {
        module('app');
        module('auth');

        inject(function($injector, _api) {
            api = _api;
            $httpBackend = $injector.get('$httpBackend');

            Auth = $injector.get('Auth');
            callback = jasmine.createSpy();
        })
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should build Auth', function() {
        expect(typeof Auth.loggedIn).toBe('boolean');
        expect(typeof Auth.login).toBe('function');
        expect(typeof Auth.logout).toBe('function');
        expect(typeof Auth.setLoggedIn).toBe('function');
    });

    it('should login to Maasive', function() {
        $httpBackend.expect('POST', api + '/auth/login/')
            .respond('200', '');
        Auth.login({}, callback);

        // not sure how to treat the callback function
        // here since it would be called in a successful
        // http request
        expect(callback).not.toHaveBeenCalled();
        $httpBackend.flush();
    });

    it('should logout of Maasive', function() {
        $httpBackend.expect('GET', api + '/auth/logout/')
            .respond('200', '');
        Auth.logout(callback);

        // not sure how to treat the callback function
        // here since it would be called in a successful
        // http request
        expect(callback).not.toHaveBeenCalled();
        $httpBackend.flush();
    });

    it('should set the loggedIn flag', function() {

        //TODO: remove this monkey patching and write correct unit test
        var oldLoggedIn = Auth.loggedIn;
        expect(Auth.loggedIn).toBe(false);
        Auth.setLoggedIn(true);
        expect(Auth.loggedIn).toBe(true);
        Auth.setLoggedIn(oldLoggedIn);
    });
});