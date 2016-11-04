/**
 * Created by user on 24.10.16.
 */
angular.
  module('SlidesApp').
  component('profilePage', {
    templateUrl: 'components/profile-page/profile-page.template.html',
    controller: ['Auth', '$scope', '$rootScope', 'currentUserService',
      function (Auth, $scope, $rootScope, currentUserService) {
        var self = this;
        self.successUpdeate = false;
        $rootScope.change = false;
        self.error = false;
        Auth.currentUser().$promise.then(
          function (response) {
            $scope.user = response;
            $scope.user.birth_date = new Date(response.birth_date);
            $scope.username = $scope.user.username;
            $scope.first_name = $scope.user.first_name;
            $scope.last_name = $scope.user.last_name;
            $scope.email = $scope.user.email;
            $scope.birth_date = $scope.user.birth_date;
            $scope.gender = $scope.user.gender;
          }
        ).catch(function (error) {
          currentUserService.checkStatus(error);
        });
        self.changeOn = function () {
          $rootScope.change = !$rootScope.change;
        };
        $scope.updateUserInfo = function () {
          self.error = false;
          if (new Date() / 1 > $scope.birth_date.getTime() && new Date(1900, 1 , 1) / 1 < $scope.user.birth_date.getTime()) {
            var birth_date = $scope.user.birth_date.toLocaleDateString().split('.');
            birth_date = birth_date.reverse().join('-');
            Auth.updateUser({}, {
              username: $scope.username,
              first_name: $scope.first_name,
              last_name: $scope.last_name,
              email: $scope.email,
              birth_date: birth_date,
              gender: $scope.gender
            }).$promise.then(function (response) {
              $rootScope.change = false;
            }).catch(function (error) {
              currentUserService.checkStatus(error);
              for (var key in error['data']) {
                self.errorMes = error['data'][key][0];
              }
              self.error = true;
            });
          } else {
            self.errorMes = 'Check the entered date.';
            self.error = true;
          }
        }
      }
    ]
  });