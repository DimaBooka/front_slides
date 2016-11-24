angular.module('presentationService', [])
 .factory('Presentation', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/presentations/:id/', { page: 1, }, {
        get: {
          method: 'GET',
          params: {
            id: '@id',
          },
        },
        published: {
          method: 'GET',
          params: {
            ordering: '-date_created',
            published: 2,  // true
          },
        },
        query: {
          method: 'GET',
        }
      });
    }
 ]);
