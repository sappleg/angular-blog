'use strict';

/* Mock Module */

angular.module('SpencerApplegateBlog.mockBackend', ['ngMockE2E'])
    .run(['$httpBackend', function($httpBackend) {

        var Post = function(id, comments_id, title, text) {
            this.tags = [];
            this.text = text;
            this.title = title;
            this.comments = {};
            this.comments.tags = [];
            this.comments.ids = null;
            this.comments.collection = "comments";
            this.comments.version = 0;
            this.comments.query = "?post_id=" + id;
            this.comments.id = comments_id; // this id will correspond to a dictionary of comments for this post
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

        var posts = {}; // initialize posts object
        var id_tmp = idGenerator(); // create id for first post
        var com_id_tmp = idGenerator(); // create id for comments collection
        posts[id_tmp] = new Post(id_tmp, com_id_tmp, "This is a title", "This is a body");

        var comments = {};
        var com_id_tmp_1 = idGenerator();
        var com_id_tmp_2 = idGenerator();
        comments[com_id_tmp] = {};
        comments[com_id_tmp][com_id_tmp_1] = new Comment(com_id_tmp_1, "", id_tmp, "spencer.applegate3@gmail.com", "whatt?");
        comments[com_id_tmp][com_id_tmp_2] = new Comment(com_id_tmp_2, "", id_tmp, "spencer.applegate3@gmail.com", "whatt, 2?");

        Post.prototype.getComments = function(id) {
            return comments[id];
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

            var id = parts[1];
            var post = posts[id];
            post.comments = post.getComments(post.comments.id);
            console.log(post);


            return[200, {}];
        });

        $httpBackend.whenPUT(/\/posts(\/[0-9a-z]{24})/).respond(function(method, url, data, headers) {
            var parts = url.replace('/posts', '').split('/');
            var id = parts[1];

//            posts[id] = angular.fromJson(data);
//            console.log(posts[id]);

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

        $httpBackend.whenGET(/^views\//).passThrough();
    }]);
