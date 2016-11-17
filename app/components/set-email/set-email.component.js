angular.
  module('SlidesApp').
  component('setEmail', {
    templateUrl: 'components/set-email/set-email.template.html',
    controller: ['$rootScope', '$state', 'setEmailForUser', '$scope', 'currentUserService',
      function ($rootScope, $state, setEmailForUser, $scope, currentUserService) {
        if ($rootScope.user){
          $state.go('presentations');
        } else {
          $scope.email = '';
          $scope.messageConfirmEmail = false;
          $scope.setEmail = function () {
            setEmailForUser.save({}, {'email': this.email}).$promise.then(
                function (response) {
                  if (response['success']) {
                    $scope.messageConfirmEmail = response['success'];
                  } else {
                    $state.go('validatePassword');
                  }
                }
            )
          }
        }
      }
    ]
  });
