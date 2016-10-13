/**
 * Created by user on 12.10.16.
 */
angular.module('UploadServices', ['ngResource'])
     .config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
     })
     .factory('UploadService', ['$resource',
        function($resource) {
          return $resource('http://127.0.0.1:7700/api/presentations/:id', {'id': '@id'}, {});
        }
     ]);
