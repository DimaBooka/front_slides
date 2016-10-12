angular.module('GetListPresentationServices', ['ngResource'])
 .config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
 })
 .factory('GetPresentationsService', ['$resource',
    function($resource) {
  		console.log('factory');
      return $resource('http://127.0.0.1:8005/api/public_presentations/', {}, {isArray: true});
    }
 ]);