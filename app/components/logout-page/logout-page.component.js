/**
 * Created by user on 13.10.16.
 */
angular.
  module('SlidesApp').
  component('logoutPage', {
    controller: [ 'Auth', '$http', '$state', '$rootScope',
      function (Auth, $httpProvider, $state, $rootScope) {
        Auth.logout({},{
        	'token': localStorage['token'],
        }).$promise.then( function () {
        	$httpProvider.defaults.headers.common['Authorization'] = undefined;
        	localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('profileMenu');
          $rootScope.token = undefined;
          $state.go('presentations');
        });
      }
    ]
  });