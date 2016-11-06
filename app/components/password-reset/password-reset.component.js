/**
 * Created by user on 06.11.16.
 */
angular.
  module('SlidesApp').
  component('passwordReset', {
    templateUrl: 'components/password-reset/password-reset.template.html',
    controller: [ '$stateParams', '$scope', '$state', '$rootScope', 'Auth',
      function ($stateParams, $scope, $state, $rootScope, Auth) {
        if ($rootScope.user){
          $state.go('presentations');
        }
      }
    ]
  });
