/**
 * Created by user on 24.10.16.
 */
angular.
  module('SlidesApp').
  component('profilePage', {
    templateUrl: 'components/profile-page/profile-page.template.html',
    controller: ['Auth', '$scope', '$stateParams', '$state',
      function (Auth, $scope, $stateParams, $state) {
        var self = this;
        self.successUpdeate = false;
        self.error = false;
        Auth.currentUser().$promise.then(
            function (response) {
                $scope.user = response;
            }
        );
        $scope.updateUserInfo = function () {
          Auth.updateUser({}, {
            username: $scope.user.username,
            first_name: $scope.user.first_name,
            last_name: $scope.user.last_name,
            email: $scope.user.email,
            birth_date: $scope.user.birth_date,
            phone_number: $scope.user.phone_number,
            gender: $scope.user.gender
          }).$promise.then(function (response) {
            self.successUpdeate = true;
          }).catch(function (error) {
            for (var key in error['data']){
              self.errorMes = error['data'][key][0];
            }
            self.error = true;
          });
        }
      }
    ]
  });