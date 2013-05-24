'use strict';

/* Services */

angular.module('SpencerApplegateBlog.services', ['ngResource'])

    // creates Post objects to persist with MongoLab
    .factory('Post', ['$resource', function ($resource) {
        // define post object attributes
        var Post = $resource('https://api.mongolab.com/api/1/databases' +
            '/spencerapplegate_blog/collections/posts/:id',
            { apiKey: '6Y4sT7bQvkiqJUKTkAsbDY-P8l4sPtaH' },
            { update: { method: 'PUT' } }
        );

        // method to update blog posts in the db
        Post.prototype.update = function(cb) {
            return Post.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        // method to delete blog posts in the db
        Post.prototype.destroy = function(cb) {
            return Post.remove({id: this._id.$oid}, cb);
        };

        return Post;
    }])

    // current version of the application
    .value('version', '0.1');
