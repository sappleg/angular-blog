/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/29/13
 * Time: 11:41 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, afterEach */
/*global describe, it, expect */
/*global window, eb, loadFixtures */

'use strict';

describe('blog.posts', function() {

    beforeEach(function() {
        module('app');
        module('blog.posts');
    });

    describe('Post service', function() {
        var $httpBackend, api, Post, callback;
        var fakePosts = [
            {
                "tags": [],
                "text": "This is the body of my first post",
                "_ts": 1375231658,
                "_version": 0,
                "comments": "comments/",
                "_slug": "UeieUFPUyQTn_uPH",
                "title": "First Post",
                "id": "51e89e5053d4c904e7fee3c7",
                "aliases": []
            },
            {
                "tags": [],
                "text": "This is the body of my second post",
                "_ts": 1373946519,
                "_version": 4,
                "comments": "comments/",
                "_slug": "UeTCl1PUyQTn_t2l",
                "title": "Second Post",
                "id": "51e4c29753d4c904e7fedda5",
                "aliases": []
            }
        ];

        beforeEach(inject(function($injector, _api) {
            $httpBackend = $injector.get('$httpBackend');
            api = _api;
            Post = $injector.get('Post');
            callback = jasmine.createSpy('callback');
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get a list of blog posts', function() {
            $httpBackend.expect('GET', api + '/posts/')
                .respond(fakePosts);
            Post.query();

            $httpBackend.flush();
        });

        it('should get a single blog post', function() {
            $httpBackend.expect('GET', api + '/posts/' + fakePosts[0].id)
                .respond('200', fakePosts[0]);
            Post.get({id: fakePosts[0].id});

            $httpBackend.flush();
        });

        it('should save a blog post', function() {
            $httpBackend.expect('POST', api + '/posts/', fakePosts[0])
                .respond('200', fakePosts[0]);
            Post.save(fakePosts[0], callback);

            $httpBackend.flush();
        });

        it('should update a blog post', function() {
            $httpBackend.expect('PUT', api + '/posts/' + fakePosts[0].id, fakePosts[0])
                .respond('200', callback);
            Post.update({id: fakePosts[0].id}, fakePosts[0], callback);

            $httpBackend.flush();
        });

        it('should remove a blog post', function() {
            $httpBackend.expect('DELETE', api + '/posts/' + fakePosts[0].id)
                .respond('200', callback);
            Post.remove({id: fakePosts[0].id}, callback);

            $httpBackend.flush();
        });

        it('should call the Post.update method on prototype chain', function() {
            Post.update = jasmine.createSpy('update');
            var post = new Post();

            post.update(callback);
            expect(Post.update).toHaveBeenCalled();
        });

        it('should call the Post.remove method on prototype chain', function() {
            Post.remove = jasmine.createSpy('remove');
            var post = new Post();

            post.destroy(callback);
            expect(Post.remove).toHaveBeenCalled();
        });
    });
});