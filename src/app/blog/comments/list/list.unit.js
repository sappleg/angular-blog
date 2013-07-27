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
        var $scope, listCtrl, Comment;
        var routeParamsStub = jasmine.createSpy('routeParamsStub');

        beforeEach(inject(function($injector, $controller, $rootScope) {
            $scope = $rootScope.$new();

            //TODO: hash out routeParams stub
            routeParamsStub.postId = '7';

            //TODO: look into promise objects for query function
            Comment = $injector.get('Comment');
            spyOn(Comment, 'query');
            Comment.query = function(params) {
                this.then = function(callback) {
                    callback();
                }
            };
            Comment.remove = function(params, callback) {
                callback();
                return params;
            };

            listCtrl = $controller('comments.ListCtrl', {
                $scope: $scope,
                Comment: Comment,
                $routeParams: routeParamsStub
            })
        }));

        it('should get all the comments for a post', function() {
            expect(Comment.query).toHaveBeenCalled();
        });
    });
});