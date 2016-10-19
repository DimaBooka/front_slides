/**
 * Created by user on 12.10.16.
 */
angular.module('AuthorizationService', ['ngResource'])
     .config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
     })
     .factory('AuthorizService', ['$resource', 'baseUrl',
        function($resource, baseUrl) {
          return $resource(baseUrl + '/api/rest-auth/login/', {}, {});
        }
     ])
     .factory('RegistraService', ['$resource', 'baseUrl',
        function($resource, baseUrl) {
          return $resource(baseUrl + '/api/rest-auth/registration/', {}, {});
        }
     ])
     .factory('LogoutService', ['$resource', 'baseUrl',
        function($resource, baseUrl) {
          return $resource(baseUrl + '/api/rest-auth/logout/', {}, {});
        }
     ])
     .factory('ResetPasswordService', ['$resource', 'baseUrl',
        function($resource, baseUrl) {
          return $resource(baseUrl + '/api/rest-auth/password/change/', {}, {});
        }
     ])
     .factory('RestorePasswordService', ['$resource', 'baseUrl',
        function($resource, baseUrl) {
          return $resource(baseUrl + '/api/rest-auth/password/reset/', {}, {});
        }
     ]);
