angular.module('commentService', [])
 .factory('Comments', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/comments/:id/', {}, {
        forPresentation: {
          method: 'GET',
          params: {
            presentation_id: '@id',
            ordering: 'date_created',
          },
          isArray: true,
        },
        create: {
          method: 'POST',
        }
      });
    }
 ]);
