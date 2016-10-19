angular.module('presentationService', [])
 .factory('Presentation', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/presentations/:id/', {}, {
        get: {
          method: 'GET',
          params: {
            id: '@id',
          },
        },
        query: {
          method: 'GET',
          params: {
            ordering: 'date_created',
            published: 2,  // true
          },
          isArray: true,
        },
      });
    }
 ]);