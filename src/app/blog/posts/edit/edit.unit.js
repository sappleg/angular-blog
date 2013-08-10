/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/14/13
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, afterEach */
/*global describe, it, expect */
/*global window, eb, loadFixtures */

'use strict';

describe('posts.edit', function() {
    var fakePost = {
        "tags": [],
        "text": "This is the body of my first post",
        "_ts": 1375231658,
        "_version": 0,
        "comments": "comments/",
        "_slug": "UeieUFPUyQTn_uPH",
        "title": "First Post",
        "id": "51e89e5053d4c904e7fee3c7",
        "aliases": []
    };

    beforeEach(function() {
        module('app');
		module('posts.edit');
    });

    describe('posts.CreateCtrl', function() {
        var $scope, Post, createCtrl;

        beforeEach(inject(function($injector, $rootScope, $controller) {
            $scope = $rootScope.$new();

            Post = $injector.get('Post');
            Post.save = jasmine.createSpy('save');

            $scope.post = fakePost;

            createCtrl = $controller('posts.CreateCtrl', {
                $scope: $scope,
                Post: Post
            });
        }));

        it('should create a new blog post', function() {
            $scope.save();
            expect(Post.save.mostRecentCall.args[0] instanceof Object).toBeTruthy();
            expect(Post.save.mostRecentCall.args[0].id).toBe('51e89e5053d4c904e7fee3c7');
        });
    });

    describe('posts.EditCtrl', function() {
        var $scope, $routeParams, Post, editCtrl, postPromise;

        beforeEach(inject(function($injector, $rootScope, $controller) {
            $scope = $rootScope.$new();

            postPromise = {
                then: function(callback) {
                    callback(fakePost);
                }
            };

            Post = $injector.get('Post');
            Post.get = jasmine.createSpy('get').andReturn(postPromise);


            $routeParams = {
                id: fakePost.id
            };

            editCtrl = $controller('posts.EditCtrl', {
                $scope: $scope,
                $routeParams: $routeParams,
                Post: Post
            });
        }));

        it('should get the blog post to edit', function() {
            expect(Post.get).toHaveBeenCalledWith({id: $routeParams.id});
        });

        //TODO: finish rest of coverage
    });
});
