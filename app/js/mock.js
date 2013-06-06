'use strict';

/* Mock Module */

angular.module('SpencerApplegateBlog.mockBackend', ['ngMockE2E'])
    .run(['$httpBackend', function($httpBackend) {

        var posts = {
            "51ac0423g1m8dt105i321c9m": {
                "title":"First blog post",
                "text":"This is the body of my first blog post",
                "comments": {},
                "tags": [],
                "email": null,
                "version": 1,
                "_links": {
                    "relative": {
                        "api": "/51a7af2453d4c95a951cf9de/",
                        "document": "51a7af2453d4c95a951cf9de/"
                    },
                    "absolute": "http://dev.maasive.net/SuperSpock/spencer/posts/51a7af2453d4c95a951cf9de/"
                },
                "id":"51ac0423g1m8dt105i321c9m"
            },
            "51b10f92bprgrnyrjcrtmki5": {
                "title":"First blog post",
                "text":"This is the body of my first blog post",
                "comments": {},
                "tags": [],
                "email": null,
                "version": 1,
                "_links": {
                    "relative": {
                        "api": "/51b10f92bprgrnyrjcrtmki5/",
                        "document": "51b10f92bprgrnyrjcrtmki5/"
                    },
                    "absolute": "http://dev.maasive.net/SuperSpock/spencer/posts/51b10f92bprgrnyrjcrtmki5/"
                },
                "id":"51b10f92bprgrnyrjcrtmki5"
            }
        };

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