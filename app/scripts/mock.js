'use strict';

/* Mock Module */

angular.module('SpencerApplegateBlog.mockBackend', ['ngMockE2E'])
    .run(['$httpBackend', function($httpBackend) {

        var posts = {
            "51ac0423g1m8dt105i321c9m": {
                "tags": [],
                "text":"This is the body of my first blog post",
                "title":"First blog post",
                "comments": {
                    "tags": [],
                    "ids": null,
                    "collection": "comments",
                    "version": 0,
                    "query": "?post_id=51ac0423g1m8dt105i321c9m",
                    "id": "51ac0423g1m8dt105i321c9m"
                },
                "email": "spencer.applegate3@gmail.com",
                "version": 1,
                "_links": {
                    "relative": {
                        "api": "/51ac0423g1m8dt105i321c9m/",
                        "document": "51ac0423g1m8dt105i321c9m/"
                    },
                    "absolute": "http://dev.maasive.net/SuperSpock/spencer/posts/51a7af2453d4c95a951cf9de/"
                },
                "id":"51ac0423g1m8dt105i321c9m"
            }
        };

        var comments = {
            "51b20d0453d4c9058a431525": {
                "tags": [],
                "text": "This is a random comment",
                "email": "josh@maasive.net",
                "version": 1,
                "_links": {
                    "relative": {
                        "api": "/51b20d0453d4c9058a431525/",
                        "document": "51b20d0453d4c9058a431525/"
                    },
                    "absolute": "http://SuperSpock/SuperSpock/spencer/comments/51b20d0453d4c9058a431525/"
                },
                "parentId": "51b20ce953d4c9058a431524",
                "postId": "51b20c4e53d4c9058a431521",
                "id": "51b20d0453d4c9058a431525"
            },
            "51b4e09653d4c9058a503e82": {
                "tags": [],
                "text": "This comment is attached to post 51b20c4e53d4c9058a431521, but not a reply to any other comment",
                "email": "josh@maasive.net",
                "version": 1,
                "_links": {
                    "relative": {
                        "api": "/51b4e09653d4c9058a503e82/",
                        "document": "51b4e09653d4c9058a503e82/"
                    },
                    "absolute": "http://SuperSpock/SuperSpock/spencer/comments/51b4e09653d4c9058a503e82/"
                },
                "parentId": "",
                "postId": "51b20c4e53d4c9058a431521",
                "id": "51b4e09653d4c9058a503e82"
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

        function compileComments() {

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

        $httpBackend.whenGET(/^views\//).passThrough();
    }]);
