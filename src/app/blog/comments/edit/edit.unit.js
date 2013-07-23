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
        //TODO: figure out module inject better for testing
        module('app');
        module('blog.comments');
        module('comments.edit');
    });

    describe('edit controller', function() {
        var $scope, editCtrl, Comment;

        var mockComment = {
            email: 'spencerdev@maasive.net',
            text: 'mock text'
        };

        beforeEach(inject(function($rootScope, $injector, $controller) {
            var routeParamsStub = jasmine.createSpy('routeParamsStub');
            routeParamsStub.postId = '7';

            $scope = $rootScope.$new();

            Comment = $injector.get('Comment');
            Comment.save = function(comment, callback) {
                return 'saved';
            };
//            jasmine.spyOn(Comment, 'constructor').andReturn(mockComment);

            editCtrl = $controller('comments.EditCtrl', {
                $scope: $scope,
                $routeParams: routeParamsStub,
                Comment: Comment
            });
        }));

        it('should have a edit controller', function() {
            expect(editCtrl).not.toBe(null);
            expect(editCtrl).not.toBe(undefined);
        });

        //TODO: figure out how to spy on Comment constructor
        describe('save function', function() {
            beforeEach(function() {
//                spyOn(Comment, 'constructor');
//                Comment.prototype.constructor = jasmine.createSpy('Comment.constructor spy').andReturn(mockComment);
                $scope.save(mockComment);
            });

            it('should attach a comment to the scope and save it via the Comment service', function() {

                expect(typeof $scope.comment).toBe('object');
                expect($scope.comment.email).toBe(mockComment.email);
                expect($scope.comment.text).toBe(mockComment.text);
                expect($scope.comment.postId).toBe('7');
//                expect(Comment.prototype.constructor).toHaveBeenCalled();
//                expect(Comment.constructor).toHaveBeenCalledWith(mockComment);
            });
        });
    });
});