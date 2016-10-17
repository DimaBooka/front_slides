angular.
  module('SlidesApp').
  component('loginPage', {
    templateUrl: 'components/login-page/login-page.template.html',
    controller: [ 'AuthorizService', '$rootScope', '$location',
      function (AuthorizService, $rootScope, $location) {
        var self = this;
        this.loginTrue = true;
        this.resetTrue = false;
        this.changeIf = function () {
          this.loginTrue = false;
          this.resetTrue = true;
        };
        this.login = function () {
          AuthorizService.save({}, {
            username: self.username,
            password: self.password
          }).$promise.then(function () {
            $rootScope.isAuth = true;
            $location.path('/')
          });
        }
      }
    ]
  });