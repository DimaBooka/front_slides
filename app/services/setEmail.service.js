/**
 * Created by bogdan on 11/9/16.
 */
 angular.module('setEmailService', [])
     .factory('setEmailForUser', ['$resource', 'baseUrl',
       function($resource, baseUrl) {
         return $resource(baseUrl + '/api/accept-email/', {}, {})
       }
     ]);
