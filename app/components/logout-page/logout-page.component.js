/**
 * Created by user on 13.10.16.
 */
angular.
  module('SlidesApp').
  component('logoutPage', {
    controller: [ 'LogoutService', '$http', '$location', '$rootScope',
      function (LogoutService, $httpProvider, $location, $rootScope) {
        LogoutService.save({},{
        	'token': localStorage['token'],
        }).$promise.then( function () {
        	$httpProvider.defaults.headers.common['Authorization'] = undefined;
        	localStorage.removeItem('token');
          $rootScope.token = undefined;
          $location.path('/');
        });
      }
    ]
  });