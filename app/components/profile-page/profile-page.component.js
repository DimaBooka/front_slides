/**
 * Created by user on 24.10.16.
 */
angular.
  module('SlidesApp').
  component('profilePage', {
    templateUrl: 'components/profile-page/profile-page.template.html',
    controller: ['Auth', '$scope', '$rootScope', 'currentUserService', '$state',
      function (Auth, $scope, $rootScope, currentUserService, $state) {
        if (!$rootScope.user){
          $state.go('login');
        }
        var self = this;
        self.successUpdeate = false;
        $rootScope.change = false;
        self.error = false;
        self.emailChange = false;
        this.getUserProfile = function () {
          Auth.currentUser().$promise.then(
            function (response) {
              $scope.user = response;
              if (Date.parse(response.birth_date)) {
                $scope.user.birth_date = new Date(response.birth_date);
                self.birth_date = $scope.user.birth_date;
              }
              self.username = $scope.user.username;
              self.first_name = $scope.user.first_name;
              self.last_name = $scope.user.last_name;
              self.email = $scope.user.email;
              self.gender = $scope.user.gender;
            }
          ).catch(function (error) {
            currentUserService.checkStatus(error);
          });
        };
        this.getUserProfile();
        self.changeOn = function () {
          self.emailChange = false;
          $rootScope.change = !$rootScope.change;
        };
        $scope.updateUserInfo = function () {
          self.error = false;
          self.emailChange = false;
          if (new Date() / 1 > self.birth_date.getTime() && new Date(1900, 1 , 1) / 1 < self.birth_date.getTime()) {
            var birth_date = self.birth_date;
            var old_email = this.user.email;
            birth_date = [birth_date.getUTCFullYear(), birth_date.getMonth() + 1, birth_date.getDate()].join('-');
            Auth.updateUser({}, {
              username: self.username,
              first_name: self.first_name,
              last_name: self.last_name,
              email: self.email,
              birth_date: birth_date,
              gender: self.gender
            }).$promise.then(function (response) {
              if (self.email != old_email) {
                self.emailChange = 'Check your email to confirmation your new email address';
              }
              $rootScope.change = false;
              self.getUserProfile();
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