'use strict';

/* Mock Module */

angular.module('SpencerApplegateBlog.mockBackend', ['ngMockE2E'])
    .run(['$httpBackend', function($httpBackend) {

        var Post = function(id, comments_id, title, text) {
            this.tags = [];
            this.text = text;
            this.title = title;
            this.commentId = comments_id;
            this.email = "spencer.applegate3@gmail.com";
            this.version = 1;
            this._links = {};
            this._links.relative = {};
            this._links.absolute = {};
            this._links.relative.api = "/" + id + "/";
            this._links.relative.document = id + "/";
            this._links.absolute = "http://dev.maasive.net/SuperSpock/spencer/posts/" + id + "/";
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
            this._links.relative.api = "/" + id + "/";
            this._links.relative.document = id + "/";
            this._links.absolute = "http://dev.maasive.net/SuperSpock/spencer/comments/" + id + "/";
            this.parentId = parentId;
            this.postId = postId;
            this.id = id;
            this.timestamp = Date.now();
        };

        // initialize objects for mockBackend use
        var posts = {}; // initialize posts object
        var id_tmp = "51b7b443wmsciv3sgifciqo2"; // create id for first post
        posts[id_tmp] = new Post(id_tmp, id_tmp, "This is a title", "This is a body");

        var comments = {};
        var com_id_tmp_1 = "51b7b4bc8lycn8qgcib4bb49";
        var com_id_tmp_2 = "51b7b4bc8lycn8qgcib4cc5x";
        comments[id_tmp] = {};
        comments[id_tmp][com_id_tmp_1] = new Comment(com_id_tmp_1, "", id_tmp, "spencer.applegate3@gmail.com", "whatt?");
        comments[id_tmp][com_id_tmp_2] = new Comment(com_id_tmp_2, "", id_tmp, "spencer.applegate3@gmail.com", "whatt, 2?");

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
                    if (obj.hasOwnProperty(comment) && comment == id) {
                        delete obj[comment];
                    }
                }
            }
        }

        $httpBackend.whenGET('/posts').respond(function(method, url, data, headers) {
            return[200, posts];
        });

        $httpBackend.whenGET(/\/posts(\/[0-9a-z]{24})/).respond(function(method, url, data, headers) {
            var parts = url.replace('/posts', '').split('/');

            var id = parts[1];
            var post = posts[id];
            var comId = post.commentId;
            post.comments = comments[comId];

            return[200, post];
        });

        $httpBackend.whenPUT(/\/posts(\/[0-9a-z]{24})/).respond(function(method, url, data, headers) {
            var parts = url.replace('/posts', '').split('/');
            var id = parts[1];
            posts[id] = angular.fromJson(data);

            return [200, {}, {}];
        });

        $httpBackend.whenPOST('/posts').respond(function(method, url, data, headers) {
            var data_transformed = angular.fromJson(data);

            var post = new Post(idGenerator(), idGenerator(), data_transformed.title, data_transformed.text);

            posts[post.id] = post;
            return [200, {}, {}];
        });

        $httpBackend.whenDELETE(/\/posts(\/[0-9a-z]{24})/).respond(function(method, url, data, headers) {
            var parts = url.replace('/posts', '').split('/');
            var id = parts[1];

            delete posts[id];
            return[200, {}, {}];
        });

        $httpBackend.whenPOST('/comments').respond(function(method, url, data, headers) {
            var data_trans = angular.fromJson(data);

            var comment = new Comment(idGenerator(), data_trans.parentId, data_trans.postId, data_trans.email, data_trans.text);

            comments[comment.postId][comment.id] = comment;
            return [200, {}, {}];
        });

        $httpBackend.whenDELETE(/\/comments(\/[0-9a-z]{24})/).respond(function(method, url, data, headers) {
            var parts = url.replace('/comments', '').split('/');
            var id = parts[1];

            deleteComment(id);
            return[200, {}, {}];
        });

        $httpBackend.whenGET(/^views\//).passThrough();
    }]);
