/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/23/13
 * Time: 10:29 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, afterEach */
/*global describe, it, expect */
/*global window, eb, loadFixtures */

'use strict';

describe('comments.list', function() {

    beforeEach(function() {
        module('app');
        module('blog.comments');
        module('comments.list');
    });

    describe('comments.ListCtrl', function() {
        var $scope, listCtrl, Comment, CommentPromise, fakeComments;
        var routeParamsStub = jasmine.createSpy('routeParamsStub');

        beforeEach(inject(function($injector, $controller, $rootScope) {
            fakeComments = [
                {
                    id: '51e8861253d4c904e7fee371',
                    email: 'spencerdev@maasive.net',
                    text: 'fake text'
                },
                {
                    id: '51e8861253d4c904e7fee372',
                    email: 'spencerdev@maasive.net',
                    text: 'fake text 2'
                }
            ];

            $scope = $rootScope.$new();

            routeParamsStub.id = fakeComments[0].id;

            CommentPromise = {
                then: function(callback) {
                    callback(fakeComments);
                }
            };

            Comment = $injector.get('Comment');
            Comment.query = jasmine.createSpy('query').andReturn(CommentPromise);
            Comment.remove = jasmine.createSpy('remove');


            listCtrl = $controller('comments.ListCtrl', {
                $scope: $scope,
                Comment: Comment,
                $routeParams: routeParamsStub
            })
        }));

        it('should get all the comments for a post', function() {
            var timestamp = fakeComments[0].id.toString().substring(0, 8);
            expect(Comment.query).toHaveBeenCalledWith({postId: routeParamsStub.id})
            //TODO: figure out why this is an object instead of an array
//            expect(typeof $scope.comments).toBe('array');
            expect($scope.comments.length).toBe(2);
            expect($scope.comments[0].timestamp.getDate()).toBe(new Date(parseInt(timestamp, 16) * 1000).getDate())
        });

        //TODO: figure out how to actually test removal of comment object
        it('should be able to delete a comment', function() {
            $scope.destroy(fakeComments[0]);
            expect(Comment.remove).toHaveBeenCalled();
        });
    });
});