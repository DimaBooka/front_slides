angular.
  module('SlidesApp').
  component('confirmEmail', {
    templateUrl: 'components/confirm-email/confirm-email.template.html',
    controller: [ '$stateParams', '$scope', '$state', '$rootScope', 'Auth',
      function ($stateParams, $scope, $state, $rootScope, Auth) {
        if ($rootScope.user) {
          $state.go('presentations');
        } else {
          $scope.key = $stateParams.key;
          $scope.confirm = function () {
            Auth.confirmEmail({}, {key: $scope.key})
          };
        }
      }
    ]
  });
