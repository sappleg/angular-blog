/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/18/13
 * Time: 11:26 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('auth.login', function() {
    describe('login controller', function() {
        var $scope, loginCtrl;

        beforeEach(function() {
            module('app');

            inject(function($rootScope, $controller) {
                $scope = $rootScope.$new();
                loginCtrl = $controller('login.LoginCtrl', {
                    $scope: $scope
                });
            });
        });

        it('should have a login controller', function() {
            expect(loginCtrl).not.toBe(null);
            expect(loginCtrl).not.toBe(undefined);
        });

        it('should scope the auth functionality', function() {
            expect($scope.auth).not.toBe(undefined);
            expect(typeof $scope.auth).toBe('object');
        });

        it('should attach a login function to the scope', function() {
            expect($scope.login).not.toBe(undefined);
            expect(typeof $scope.login).toBe('function');
        });

        describe('login function', function() {
            var $httpBackend, api;

            beforeEach(inject(function($injector, _api) {
                $httpBackend = $injector.get('$httpBackend');
                api = _api;
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should call the login function on the scope', function() {
                spyOn($scope, 'login').andCallThrough();

                $httpBackend.expect('POST', api + '/auth/login/')
                    .respond('200', 'login');
                $scope.login();

                expect($scope.login).toHaveBeenCalled();

                $httpBackend.flush();
            });

            describe('Auth.login function', function() {
                var loginCreds = {
                    'email': 'spencerdev@maasive.net',
                    'password': 'spencer1!@'
                    },
                    callback;

                beforeEach(function() {
                    callback = jasmine.createSpy('callback');
                });

                it('should be called with the correct params', function() {
                    $httpBackend.expect('POST', api + '/auth/login/')
                        .respond('200', callback());
                    $scope.auth.login(loginCreds, callback);

                    expect(callback).toHaveBeenCalled();

                    $httpBackend.flush();
                });
            });
        });
    });
});
