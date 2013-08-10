/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 8/10/13
 * Time: 10:54 AM
 * To change this template use File | Settings | File Templates.
 */

'use strict';

describe('posts.view', function() {
    var fakePost = {
        "tags": [],
        "text": "This is the body of my first post",
        "_ts": 1375231658,
        "_version": 0,
        "comments": [{
            "email": 'fake@gmail.com',
            "text": 'fake text',
            "id": '51e89e5053d4c904e7fee3c9'
        }],
        "_slug": "UeieUFPUyQTn_uPH",
        "title": "First Post",
        "id": "51e89e5053d4c904e7fee3c7",
        "aliases": []
    };

    beforeEach(function() {
        module('app');
        module('posts.view');
    });

    describe('posts.ViewCtrl', function() {
        var $scope, viewCtrl;

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            viewCtrl = $controller('posts.ViewCtrl', {
                $scope: $scope,
                load: fakePost,
                Auth: {
                    loggedIn: false
                }
            });
        }));

        it('should load the blog post', function() {
            expect($scope.post).toBe(fakePost);
        });

        it('should have the user logged out', function() {
            expect($scope.auth.loggedIn).toBeFalsy();
        });
    });
});