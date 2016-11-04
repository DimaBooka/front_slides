/**
 * Created by user on 13.10.16.
 */
angular.
  module('SlidesApp').
  component('logoutPage', {
    controller: [ 'Auth', 'currentUserService', '$state',
      function (Auth, currentUserService, $state) {
        currentUserService.logout().then(function () {
          $state.go('presentations');
        }).catch(function (error) {
          currentUserService.checkStatus(error);
        });
      }
    ]
  });