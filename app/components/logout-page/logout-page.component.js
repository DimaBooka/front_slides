/**
 * Created by user on 13.10.16.
 */
angular.
  module('SlidesApp').
  component('logoutPage', {
    controller: [ 'Auth', 'currentUserService', '$state', '$rootScope',
      function (Auth, currentUserService, $state, $rootScope) {
        if (!$rootScope.user){
          $state.go('login');
        } else {
          currentUserService.logout().then(function () {
            $state.go('presentations');
          }).catch(function (error) {
            currentUserService.checkStatus(error);
          });
        }
      }
    ]
  });