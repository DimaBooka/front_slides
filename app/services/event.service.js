angular.module('eventService', [])
 .factory('Event', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/events/:id/:operation/', { page: 1, }, {
        get: {
          method: 'GET',
          params: {
            id: '@id',
            ordering: date_planned,
          },

        },
        query: {
          method: 'GET',
        },
        myEvents: {
          method: 'GET',
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
