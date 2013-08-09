/**
 * Created with JetBrains WebStorm.
 * User: spencera
 * Date: 8/2/13
 * Time: 12:47 PM
 * To change this template use File | Settings | File Templates.
 */

/*global beforeEach, describe, it, expect */

'use strict';

describe('posts.list', function() {
    var fakePosts = [{
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
            "_ts": 1375231658,
            "_version": 0,
            "comments": "comments/",
            "_slug": "UeieUFPUyQTn_uPH",
            "title": "Second Post",
            "id": "51e89e5053d4c904e7fee3c8",
            "aliases": []
        }];

    beforeEach(function() {
        module('app');
        module('posts.list');
    });

    describe('posts. ListCtrl', function() {
        var $scope, Auth, listCtrl;

        beforeEach(inject(function($injector, $rootScope, $controller) {
            $scope = $rootScope.$new();

            Auth = {
                loggedIn: true
            };

            listCtrl = $controller('posts.ListCtrl', {
                $scope: $scope,
                load: fakePosts,
                Auth: Auth
            });
        }));

        it('should load blog posts', function() {
            expect($scope.posts[0].id).toBe('51e89e5053d4c904e7fee3c7');
            expect($scope.posts[1].id).toBe('51e89e5053d4c904e7fee3c8');
        });

        it('should expose Auth to the scope', function() {
            expect($scope.auth.loggedIn).toBeTruthy();
        });

        it('should show post when the title is clicked', function() {
            spyOn($scope, 'view');
            $scope.view(fakePosts[0].id);
            expect($scope.view).toHaveBeenCalledWith(fakePosts[0].id);
        });
    });
});