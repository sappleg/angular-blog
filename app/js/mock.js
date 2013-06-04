'use strict';

/* Mock Module */

angular.module('SpencerApplegateBlog.mockBackend', ['ngMockE2E'])
    .run(['$httpBackend', function($httpBackend) {
        var posts = {"51ac0423g1m8dt105i321c9m":{"id":"51ac0423g1m8dt105i321c9m", "title":"Title of mock post", "body":"Body of mock post"},
                     "51ac0419bw2hw6goj3s3g3uh":{"id":"51ac0419bw2hw6goj3s3g3uh", "title":"Title of mock post 2", "body":"Body of mock post 2"}};

        function idGenerator() {
            var length = 16;
            var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
            var result = '';

            var now = Date.parse(new Date().toString())/1000;
            var id = now.toString(16);

            for (var i = length; i > 0; --i) {
                result += chars[Math.round(Math.random() * (chars.length - 1))];
            }

            return id + result;
        }

        $httpBackend.whenGET('/posts').respond(function(method, url, data, headers) {
            return[200, posts];
        });

        $httpBackend.whenGET(/\/posts(\/[0-9a-z]{24})/).respond(function(method, url, data, headers) {
            var parts = url.replace('/posts', '').split('/');
            if (parts.length != 2) {
                return [200, posts.slice()];
            }

            var id = parts[1];
            return[200, posts[id]];

//            return[400, 'NOT-FOUND'];
        });

        $httpBackend.whenPUT(/\/posts(\/[0-9a-z]{24})/).respond(function(method, url, data, headers) {
            var parts = url.replace('/posts', '').split('/');
            var id = parts[1];

            posts[id] = angular.fromJson(data);
            return [200, posts[index], {}];
        });

        $httpBackend.whenPOST('/posts').respond(function(method, url, data, headers) {
            var post = angular.fromJson(data);
            post.id = idGenerator();
            post.timestamp = Date.now();

            posts[post.id] = post;
            return [200, {}, {}];
        });

        $httpBackend.whenDELETE(/\/posts(\/[0-9a-z]{24})/).respond(function(method, url, data, headers) {
            var parts = url.replace('/posts', '').split('/');
            var id = parts[1];

            delete posts[id];
            return[200, {}, {}];
        });

        $httpBackend.whenGET(/^partials\//).passThrough();

    }]);