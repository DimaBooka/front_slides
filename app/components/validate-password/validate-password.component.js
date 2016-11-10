angular.
  module('SlidesApp').
  component('validatePassword', {
    templateUrl: 'components/validate-password/validate-password.template.html',
    controller: ['$rootScope', '$state', 'setEmailForUser', '$scope', 'currentUserService',
      function ($rootScope, $state, setEmailForUser, $scope, currentUserService) {
        var self = this;
        $scope.password = '';
        $scope.checkPassword = function () {
          setEmailForUser.save({}, {'password': $scope.password}).$promise
            .then(function (response) {
              if (response['success']) {
                currentUserService.setToken(response['success']);
                currentUserService.loadUserFromAPI();
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
