/**
 * Created by user on 21.10.16.
 */
angular.
  module('SlidesApp').
  component('changePassword', {
    templateUrl: 'components/change-password/change-password.template.html',
    controller: ['Auth', '$scope', '$rootScope', 'currentUserService', '$state',
      function (Auth,$scope, $rootScope, currentUserService, $state) {
        if (!$rootScope.user){
          $state.go('login');
        }
        var self = this;
        self.error = false;
        $rootScope.successfuly = false;

        $scope.passwordChange = function () {
          Auth.changePass({}, {
            new_password1: $scope.new_password1,
            new_password2: $scope.new_password2,
          }).$promise.then(function (response) {
            self.messageSuccess = response['success'];
            $scope.new_password1 = '';
            $scope.new_password2 = '';
            $rootScope.successfuly = true;
          }).catch(function (error) {
            currentUserService.checkStatus(error);
            for (var key in error['data']){
              self.errorMes = error['data'][key][0];
            }
            self.error = true;
          });
        };
      }
    ]
  });