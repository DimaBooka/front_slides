angular.module('eventService', ['ngResource'])
 .config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
 })
 .factory('getEventList', ['$resource',
    function($resource) {
      return $resource(baseUrl + '/api/events/?ordering=date&state=1', {}, {isArray: true});
    }
 ]);