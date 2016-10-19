angular.module('GetListPresentationServices', ['ngResource'])
 .config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
 })
 .factory('GetPresentationsService', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
  		console.log(baseUrl);
      return $resource(baseUrl + '/api/presentations/', {}, {isArray: true}); //?published=2
    }
 ]);
