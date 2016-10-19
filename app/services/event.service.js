angular.module('eventService', ['ngResource'])
 .config(function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
 })
 .factory('Events', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/events/:id', {}, {
        get: {
          method: 'GET',
          params: {
            id: '@id',
          },
        },
        query: {
          method: 'GET',
          params: {
            ordering: 'date',
            state: 1,
          },
          isArray: true,
        },
        save: {
          method: 'POST',
        },
      });
    }
 ]);