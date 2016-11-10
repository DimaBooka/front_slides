angular.module('commentService', [])
 .factory('Comments', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/comments/:id/', {page: 1,}, {
        forPresentation: {
          method: 'GET',
          params: {
            presentation_id: '@id',
            ordering: 'date_created',
          },
        },
        create: {
          method: 'POST',
        }
      });
    }
 ]);
