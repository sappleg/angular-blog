/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/21/13
 * Time: 10:55 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, afterEach */
/*global describe, it, expect */
/*global window, eb, loadFixtures */

'use strict';

//TODO: add more coverage for instantiating comment and adding postId to it
describe('comment.edit', function() {

    beforeEach(function() {
        //TODO: figure out module inject better for testing
        module('app');
        module('blog.comments');
        module('comments.edit');
    });

    describe('comments.EditCtrl', function() {
        var $scope, editCtrl, Comment, commentNamespace;

        var mockComment = {
            email: 'spencerdev@maasive.net',
            text: 'mock text'
        };

        beforeEach(inject(function($rootScope, $injector, $controller) {
            var routeParamsStub = jasmine.createSpy('routeParamsStub');
            routeParamsStub.postId = '7';

            Comment = $injector.get('Comment');
            commentNamespace = {
                Comment: Comment
            };
            commentNamespace.Comment.save = function(comment, callback) {
                callback();
                return '';
            };

            $scope = $rootScope.$new();

            editCtrl = $controller('comments.EditCtrl', {
                $scope: $scope,
                $routeParams: routeParamsStub,
                Comment: commentNamespace.Comment
            });
        }));

        it('should have a edit controller', function() {
            expect(editCtrl).not.toBe(null);
            expect(editCtrl).not.toBe(undefined);
        });

        describe('save function', function() {

            beforeEach(function() {
//                spyOn(commentNamespace, 'Comment');
//                spyOn(Comment.prototype, 'constructor').andCallThrough();
                spyOn(Comment, 'save');
                $scope.save(mockComment);
            });

            //TODO: figure out how to spy on Comment constructor call
//            it('should create a Comment object via its constructor', function() {
//                expect(Comment.prototype.constructor).toHaveBeenCalled();
//                expect(commentNamespace.Comment).toHaveBeenCalled();
//            });

            it('should attach a comment to the scope and save it via the Comment service', function() {
                expect(typeof $scope.comment).toBe('object');
                expect($scope.comment.email).toBe(mockComment.email);
                expect($scope.comment.text).toBe(mockComment.text);
                expect($scope.comment.postId).toBe('7');
            });

            it('should call Comment\'s save function', function() {
                expect(Comment.save).toHaveBeenCalled();
            });
        });
    });
});