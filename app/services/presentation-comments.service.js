angular.module('CommentaryService', ['ngResource'])
 .config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
 })
 .factory('getPresentationComments', ['$resource',
    function($resource) {
      return $resource('http://127.0.0.1:7700/api/comments/?presentation_id=:id', {}, {isArray: true});
    }
 ]);