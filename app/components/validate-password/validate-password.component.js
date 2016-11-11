angular.
  module('SlidesApp').
  component('validatePassword', {
    templateUrl: 'components/validate-password/validate-password.template.html',
    controller: ['$rootScope', '$state', 'setEmailForUser', '$scope', 'currentUserService', 'FacebookAuth',
      function ($rootScope, $state, setEmailForUser, $scope, currentUserService, FacebookAuth) {
        var self = this;
        $scope.password = '';
        self.error = false;
        $scope.checkPassword = function () {
          setEmailForUser.save({}, {'password': $scope.password}).$promise
            .then(function (response) {
              if (response['success']) {
                currentUserService.unsetToken();
                currentUserService.unsetUser();
                FacebookAuth.watchLoginChange();
              }
            }).catch(function (error) {
              currentUserService.checkStatus(error);
              self.errorList = [];
              for (var key in error['data']){
                self.errorList.push(error['data'][key]);
              }
          });
        }
      }
    ]
  });
