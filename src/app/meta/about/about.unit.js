/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 8/10/13
 * Time: 5:39 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, afterEach, describe, it, expect, inject, jasmine */

'use strict';

describe('meta.about', function() {
    beforeEach(function() {
        module('app');
        module('meta.about');
    });

    describe('meta.AboutCtrl', function() {
        var $scope, aboutCtrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            aboutCtrl = $controller('meta.AboutCtrl', {
                $scope: $scope
            });
        }));
    });
});