angular.module('GetListPresentationServices', ['ngResource'])
 .config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
 })
 .factory('GetPresentationsService', ['$resource',
    function($resource) {
  		console.log('factory');
      return $resource('http://127.0.0.1:7700/api/presentations/?published=2', {}, {isArray: true});
    }
 ]);