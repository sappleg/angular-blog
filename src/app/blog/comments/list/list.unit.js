/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/23/13
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('comments.list', function() {

    beforeEach(function() {
        module('app');
        module('blog.comments');
        module('comments.list');
    });

    describe('comments.ListCtrl', function() {
        var $scope, listCtrl, Comment, CommentPromise, fakeComment, fakeComments;
        var routeParamsStub = jasmine.createSpy('routeParamsStub');

        beforeEach(inject(function($injector, $controller, $rootScope) {
            fakeComment = {
                id: '51e8861253d4c904e7fee371',
                email: 'spencerdev@maasive.net',
                text: 'fake text'
            };
            fakeComments = {
                '51e8861253d4c904e7fee371': fakeComment
            };

            $scope = $rootScope.$new();

            routeParamsStub.id = fakeComment.id;

            Comment = $injector.get('Comment');
            Comment.remove = function(params, callback) {
                callback();
                return params;
            };
            CommentPromise = {
                then: function(callback) {
                    callback(fakeComments);
                }
            };
            Comment.query = jasmine.createSpy('query').andReturn(CommentPromise);

            listCtrl = $controller('comments.ListCtrl', {
                $scope: $scope,
                Comment: Comment,
                $routeParams: routeParamsStub
            })
        }));

        it('should get all the comments for a post', function() {
            expect(Comment.query).toHaveBeenCalledWith({postId: routeParamsStub.id})
        });
    });
});