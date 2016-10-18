/**
 * Created by user on 13.10.16.
 */
angular.
  module('SlidesApp').
  component('logoutPage', {
    controller: [ 'LogoutService', '$http',
      function (LogoutService, $httpProvider) {
        LogoutService.save({},{
        	'token': localStorage['token'],
        }).$promise.then( function () {
        	$httpProvider.defaults.headers.common['Authorization'] = undefined;
        	localStorage.removeItem('token');
        });
      }
    ]
  });