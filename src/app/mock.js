'use strict';

angular.module('mock', ['ngMockE2E'])
    .run(['$httpBackend', function($httpBackend) {

        var Post = function(id, commentsId, title, text) {
            this.tags = [];
            this.text = text;
            this.title = title;
            this.commentId = commentsId;
            this.email = 'spencer.applegate3@gmail.com';
            this.version = 1;
            this._links = {};
            this._links.relative = {};
            this._links.absolute = {};
            this._links.relative.api = '/' + id + '/';
            this._links.relative.document = id + '/';
            this._links.absolute = 'http://dev.maasive.net/SuperSpock/spencer/posts/' + id + '/';
            this.id = id;
            this.timestamp = Date.now();
        };

        var Comment = function(id, parentId, postId, email, text) {
            this.tags = [];
            this.text = text;
            this.email = email;
            this.version = 1;
            this._links = {};
            this._links.relative = {};
            this._links.absolute = {};
            this._links.relative.api = '/' + id + '/';
            this._links.relative.document = id + '/';
            this._links.absolute = 'http://dev.maasive.net/SuperSpock/spencer/comments/' + id + '/';
            this.parentId = parentId;
            this.postId = postId;
            this.id = id;
            this.timestamp = Date.now();
        };

        // initialize objects for mockBackend use
        var posts = {}; // initialize posts object
        var idTmp = '51b7b443wmsciv3sgifciqo2'; // edit id for first post
        posts[idTmp] = new Post(idTmp, idTmp, 'This is a title', 'This is a body');

        var comments = {};
        var comIdTmp1 = '51b7b4bc8lycn8qgcib4bb49';
        var comIdTmp2 = '51b7b4bc8lycn8qgcib4cc5x';
        comments[idTmp] = {};
        comments[idTmp][comIdTmp1] = new Comment(comIdTmp1, '', idTmp, 'spencer.applegate3@gmail.com', 'whatt?');
        comments[idTmp][comIdTmp2] = new Comment(comIdTmp2, '', idTmp, 'spencer.applegate3@gmail.com', 'whatt, 2?');

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

        function deleteComment(id) {
            for (var collection in comments) {
                var obj = comments[collection];
                for (var comment in obj) {
                    if (obj.hasOwnProperty(comment) && comment === id) {
                        delete obj[comment];
                    }
                }
            }
        }

        $httpBackend.whenGET('/posts').respond(function () {
            return[200, posts];
        });

        $httpBackend.whenGET(/\/posts(\/[0-9a-z]{24})/).respond(function (method, url) {
            var parts = url.replace('/posts', '').split('/');

            var id = parts[1];
            var post = posts[id];
            var comId = post.commentId;
            post.comments = comments[comId];

            return[200, post];
        });

        $httpBackend.whenPUT(/\/posts(\/[0-9a-z]{24})/).respond(function (method, url, data) {
            var parts = url.replace('/posts', '').split('/');
            var id = parts[1];
            posts[id] = angular.fromJson(data);

            return [200, {}, {}];
        });

        $httpBackend.whenPOST('/posts').respond(function (method, url, data) {
            var dataTransformed = angular.fromJson(data);

            var post = new Post(idGenerator(), idGenerator(), dataTransformed.title, dataTransformed.text);

            posts[post.id] = post;
            return [200, {}, {}];
        });

        $httpBackend.whenDELETE(/\/posts(\/[0-9a-z]{24})/).respond(function (method, url) {
            var parts = url.replace('/posts', '').split('/');
            var id = parts[1];

            delete posts[id];
            return[200, {}, {}];
        });

        $httpBackend.whenPOST('/comments').respond(function (method, url, data) {
            var dataTrans = angular.fromJson(data);

            var comment = new Comment(idGenerator(), dataTrans.parentId, dataTrans.postId, dataTrans.email, dataTrans.text);

            comments[comment.postId][comment.id] = comment;
            return [200, {}, {}];
        });

        $httpBackend.whenDELETE(/\/comments(\/[0-9a-z]{24})/).respond(function (method, url) {
            var parts = url.replace('/comments', '').split('/');
            var id = parts[1];

            deleteComment(id);
            return[200, {}, {}];
        });

        $httpBackend.whenGET(/^views\//).passThrough();
    }]);
