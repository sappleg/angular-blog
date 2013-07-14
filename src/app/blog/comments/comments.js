/**
 * Created with JetBrains WebStorm.
 * User: spencer
 * Date: 7/11/13
 * Time: 10:22 PM
 * To change this template use File | Settings | File Templates.
 */

angular.module('blog.comments', [
        'comments.edit',
        'comments.list'])

    // this filter will return the correct comments for a given post by comparing
    // the respective post id w/ all the comments postId's.  There MUST be a more
    // optimal way of doing this. [ ng-show was not working.  There is a commented
    // line in the view partial with my attempt at an implementation of it]
    .filter('comment', [function() {
        return function(comments, id) {
            return _.filter(comments, function(comment) {
                return comment.postId == id;
            })
        }
    }])

    .factory('Comment', ['$http', '$q', '_api', function($http, $q, _api) {
        var Comment = function(data) {
            angular.extend(this, data);
        };

        Comment.save = function(comment, callback) {
            $http({method: 'POST', url: _api + '/comments', data: comment})
                .success(callback)
                .error(function() {
                    console.log('There was an error saving the comment');
                });
        };

        Comment.remove = function(params, callback) {
            $http({method: 'DELETE', url: _api + '/comments/' + params.id, withCredentials: true})
                .success(callback)
                .error(function() {
                    console.log('There was an error deleting the comment');
                });
        };

        Comment.prototype.destroy = function(callback) {
            return Comment.remove({id: this.id}, callback);
        };

        return Comment;
    }])

