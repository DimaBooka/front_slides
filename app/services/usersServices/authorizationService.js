/**
 * Created by user on 12.10.16.
 */
angular.module('AuthorizationService', ['ngResource'])
     .config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
     })
     .factory('AuthorizService', ['$resource',
        function($resource) {
          return $resource('http://127.0.0.1:7700/api/rest-auth/login/', {}, {});
        }
     ])
     .factory('RegistraService', ['$resource',
        function($resource) {
          return $resource('http://127.0.0.1:7700/api/rest-auth/registration/', {}, {});
        }
     ])
     .factory('LogoutService', ['$resource',
        function($resource) {
          return $resource('http://127.0.0.1:7700/api/rest-auth/logout/', {}, {});
        }
     ])
     .factory('ResetPasswordService', ['$resource',
        function($resource) {
          return $resource('http://127.0.0.1:7700/api/rest-auth/password/change/', {}, {});
        }
     ])
     .factory('ResetPasswordService', ['$resource',
        function($resource) {
          return $resource('http://127.0.0.1:7700/api/rest-auth/password/reset/', {}, {});
        }
     ]);
