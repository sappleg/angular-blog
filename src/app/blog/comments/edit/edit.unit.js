/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/21/13
 * Time: 10:55 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

//TODO: add more coverage for instantiating comment and adding postId to it
describe('comment.edit', function() {

    beforeEach(function() {
        module('comments.edit');
    });

    describe('edit controller', function() {
        var $scope, editCtrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            editCtrl = $controller('comments.EditCtrl', {
                $scope: $scope
            });
        }));

        it('should save a comment', function() {

        });
    });
});