/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 8/10/13
 * Time: 6:03 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, describe, it, expect, inject */

'use strict';

describe('nav', function() {

    beforeEach(function() {
        module('app');
        module('nav');
    });

    describe('nav.NavCtrl', function() {
        var $scope, $route, navCtrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            $route = { tab: 'about' };

            navCtrl = $controller('nav.NavCtrl', {
                $scope: $scope,
                $route: $route
            });
        }));

        it('should be on the about tab', function() {
            expect($scope.$route).toBe($route);
        });
    });
});