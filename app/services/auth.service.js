angular.module('authService', [])
 .factory('Auth', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/rest-auth/:operation/:afterOperation/', {}, {
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
        changePass: {
          method: 'POST',
          params: {
            operation: 'password',
            afterOperation: 'change',
          },
        },
         restorePass: {
          method: 'POST',
          params: {
            operation: 'password',
            afterOperation: 'reset',
          },
        },
        currentUser: {
          method: 'GET',
          params: {
            operation: 'user',
          },
        },
      });
    }
 ]);