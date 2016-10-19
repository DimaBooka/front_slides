angular.module('CommentaryService', ['ngResource'])
 .config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
 })
 .factory('getPresentationComments', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/comments/?presentation_id=:id', {}, {isArray: true});
    }
 ]);
