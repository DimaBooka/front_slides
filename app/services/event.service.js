angular.module('eventService', [])
 .factory('Event', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/events/:id/:operation/', {}, {
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
        update: {
          method: 'PATCH',
        },
        start:  {
          method: 'GET',
          params: {
            id: '@id',
            operation: 'start',
          }
        },
      });
    }
 ]);