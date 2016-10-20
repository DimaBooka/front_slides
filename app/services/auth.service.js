angular.module('authService', [])
 .factory('Auth', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/rest-auth/:operation/', {}, {
        login: {
          method: 'POST',
          params: {
            operation: 'login',
          },
        },
        register: {
          method: 'POST',
          params: {
            operation: 'registration',
          },
        },
        logout: {
          method: 'POST',
          params: {
            operation: 'logout',
          },
        },
        resetPass: {
          method: 'POST',
          params: {
            operation: 'resetPass',
          },
        },
        restorePass: {
          method: 'POST',
          params: {
            operation: 'restorePass',
          },
        },
      });
    }
 ]);