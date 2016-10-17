/**
 * Created by user on 13.10.16.
 */
angular.
  module('SlidesApp').
  component('logoutPage', {
    controller: [ 'LogoutService',
      function (LogoutService) {
        LogoutService.get();
      }
    ]
  });