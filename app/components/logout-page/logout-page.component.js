/**
 * Created by user on 13.10.16.
 */
angular.
  module('SlidesApp').
  component('logoutPage', {
    controller: [ 'Auth', '$http', '$location', '$rootScope',
      function (Auth, $httpProvider, $location, $rootScope) {
        Auth.logout({},{
        	'token': localStorage['token'],
        }).$promise.then( function () {
        	$httpProvider.defaults.headers.common['Authorization'] = undefined;
        	localStorage.removeItem('token');
            localStorage.removeItem('user');
          $rootScope.token = undefined;
          $location.path('/');
        });
      }
    ]
  });