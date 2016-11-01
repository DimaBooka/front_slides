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
          },
          isArray: true,
        },
        myEvents: {
          method: 'GET',
          isArray: true,
        },
        save: {
          method: 'POST',
        },
        update: {
          method: 'PATCH',
        },
        start:  {
          method: 'POST',
          params: {
            id: '@id',
            operation: 'start',
          }
        },
        end:  {
          method: 'POST',
          params: {
            id: '@id',
            operation: 'finish',
          }
        },
      });
    }
 ]);