angular.
  module('SlidesApp').
  component('setEmail', {
    templateUrl: 'components/set-email/set-email.template.html',
    controller: ['$rootScope', '$state', 'setEmailForUser', '$scope', 'currentUserService',
      function ($rootScope, $state, setEmailForUser, $scope, currentUserService) {
        $scope.email = '';
        $scope.setEmail = function () {
          setEmailForUser.save({}, {'email': $scope.email}).$promise.then(
            function (response) {
              if (response['success']) {
                currentUserService.setToken(response['success']);
                currentUserService.loadUserFromAPI();
                $state.go('presentations');
              } else {
                $state.go('validatePassword');
              }
            }
          )
        }
      }
    ]
  });
