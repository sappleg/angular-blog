'use strict';

/* Mock Module */

angular.module('SpencerApplegateBlog.mockBackend', ['ngMockE2E'])
    .run(['$httpBackend', function($httpBackend) {
        var posts = {"r0":{"id":"0", "title":"Title of mock post", "body":"Body of mock post"},
                     "r1":{"id":"1", "title":"Title of mock post 2", "body":"Body of mock post 2"}};

        $httpBackend.whenGET('/posts').respond(posts);
        $httpBackend.whenGET(/\/posts\/[0-9]/).respond(function(method, url, data, headers) {
//            var post_id = url.split('/')[2];

            return [200, {"id":posts.r0.id,"title":posts.r0.title,"body":posts.r0.body}, {}];
        });
        $httpBackend.whenGET(/^partials\//).passThrough();
    }]);