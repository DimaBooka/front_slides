angular.module('eventService', [])
 .factory('Event', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/events/:id/', {}, {
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
        myEvents: {
          method: 'GET',
          isArray: true,
        },
        save: {
          method: 'POST',
        },
        update:{
          method: 'PATCH',
        },
      });
    }
 ]);