/**
 * Created by user on 21.10.16.
 */
angular.
  module('SlidesApp').
  component('changePassword', {
    templateUrl: 'components/change-password/change-password.template.html',
    controller: ['Auth', '$scope',
      function (Auth,$scope) {
        var self = this;
        self.error = false;
        self.successfuly = false;
        $scope.passwordChange = function () {
          Auth.changePass({}, {
            new_password1: $scope.new_password1,
            new_password2: $scope.new_password2,
          }).$promise.then(function (response) {
            self.messageSuccess = response['success'];
            self.successfuly = true;
          }).catch(function (error) {
            for (var key in error['data']){
              self.errorMes = error['data'][key][0];
            }
            self.error = true;
          });
        };
      }
    ]
  });