/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/21/13
 * Time: 6:59 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, afterEach */
/*global describe, it, expect */
/*global window, eb, loadFixtures */

'use strict';

//TODO: need more coverage for constructor and destroy method
describe('comment', function() {

    describe('service', function() {
        var $httpBackend, api, Comment, callback,
            commentId = '51e5f2c953d4c904e7fee2df',
            blogPostId = '51e89e5053d4c904e7fee3c7';

        beforeEach(function() {
            module('app');
            module('blog.comments');

            inject(function($injector, _api) {
                api = _api;
                Comment = $injector.get('Comment');
                $httpBackend = $injector.get('$httpBackend');
            });

            callback = jasmine.createSpy('callback');
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get a list of comments', function() {
            $httpBackend.expect('GET', api + '/posts/' + blogPostId + '/comments/')
                .respond('200', 'comments');
            Comment.query({postId: blogPostId});

            $httpBackend.flush();
        });

        it('should save a comment', function() {
            var comment = {
                'id': '51e5f2c953d4c904e7fee2df',
                'title': 'mock title',
                'text': 'mock text'
            }

            // documentation does not support JSON formatted data even though
            // functionality is in AngularJS framework
            $httpBackend.expect('POST', api + '/comments/', comment)
                .respond('200', callback());
            Comment.save(comment, callback);

            expect(callback).toHaveBeenCalled();

            $httpBackend.flush();
        });

        it('should remove a comment', function() {
            $httpBackend.expect('DELETE', api + '/comments/' + commentId)
                .respond('200', callback());
            Comment.remove({id: commentId}, callback);

            expect(callback).toHaveBeenCalled();

            $httpBackend.flush();
        });
    });
});