/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 8/10/13
 * Time: 6:00 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, afterEach, describe, it, expect, inject, jasmine */

'use strict';

describe('meta.contact', function() {
    beforeEach(function() {
        module('app');
        module('meta.contact');
    });

    describe('meta.ContactCrl', function() {
        var $scope, contactCtrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            contactCtrl = $controller('meta.ContactCtrl', {
                $scope: $scope
            });
        }));
    });
});