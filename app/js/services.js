'use strict';

/* Services */

angular.module('SpencerApplegateBlog.services', ['ngResource'])
    .factory('Post', ['$resource', function ($resource) {
        var Post = $resource('https://api.mongolab.com/api/1/databases' +
            '/spencerapplegate_blog/collections/posts/:id',
            { apiKey: '6Y4sT7bQvkiqJUKTkAsbDY-P8l4sPtaH' },
            { update: { method: 'PUT' } }
        );

        Post.prototype.update = function(cb) {
            return Post.update({id: this._id.$oid},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        Post.prototype.destroy = function(cb) {
            return Post.remove({id: this._id.$oid}, cb);
        };

        return Post;
    }])
    .value('version', '0.1');
