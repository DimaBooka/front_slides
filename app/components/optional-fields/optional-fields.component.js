/**
 * Created by user on 24.10.16.
 */
angular.
  module('SlidesApp').
  component('optionalFields', {
    templateUrl: 'components/optional-fields/optional-fields.template.html',
    controller: ['Auth', '$scope', '$rootScope', 'currentUserService', '$state',
      function (Auth, $scope, $rootScope, currentUserService, $state) {
        if (!$rootScope.user){
          $state.go('login');
        }
        var self = this;
        self.error = false;
        this.getUserProfile = function () {
          Auth.currentUser().$promise.then(
            function (response) {
              $scope.user = response;
              self.userInfo = {};
              if (Date.parse(response.birth_date)) {
                $scope.user.birth_date = new Date(response.birth_date);
                self.userInfo.birth_date = $scope.user.birth_date;
              } else {
                self.userInfo.birth_date = null;
              }
              self.userInfo.first_name = $scope.user.first_name;
              self.userInfo.last_name = $scope.user.last_name;
              self.userInfo.gender = $scope.user.gender;
              var isFalse = false;
              for (var key in self.userInfo) {
                if (!self.userInfo[key]) {
                  isFalse = true;
                }
              }
              if (!isFalse) {
                $state.go('presentations');
              }
            }
          ).catch(function (error) {
            currentUserService.checkStatus(error);
          });
        };
        this.getUserProfile();
        $scope.completeFunc = function () {
          Auth.updateUser({}, {
              all_fields_completed: true
            }).$promise.then(function () {
             $state.go('presentations');
          })
        };
        $scope.updateUserInfo = function () {
          self.error = false;
          var birth_date  = null;
          if (self.userInfo.birth_date) {
            if (new Date() / 1 > self.userInfo.birth_date.getTime() && new Date(1900, 1 , 1) / 1 < self.userInfo.birth_date.getTime()) {
              birth_date = self.userInfo.birth_date;
              birth_date = [birth_date.getUTCFullYear(), birth_date.getMonth() + 1, birth_date.getDate()].join('-');
            } else {
              self.errorMes = 'Check the entered date.';
              self.error = true;
            }
          }
          if (!self.error) {
            Auth.updateUser({}, {
              first_name: self.userInfo.first_name,
              last_name: self.userInfo.last_name,
              birth_date: birth_date,
              gender: self.userInfo.gender
            }).$promise.then(function (response) {
              $scope.completeFunc();
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
