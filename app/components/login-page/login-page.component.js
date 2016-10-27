angular.
  module('SlidesApp').
  component('loginPage', {
    templateUrl: 'components/login-page/login-page.template.html',
    controller: [ 'Auth', 'currentUserService', '$rootScope', '$state',
      function (Auth, currentUserService, $rootScope, $state) {
        var self = this;
        self.error = false;
        this.login = function () {
          currentUserService.login(this.username, this.password).then(function () {
            $state.go('presentations');
          }).catch(function () {
            self.errorMes = 'Please enter a correct username and password. Note that both fields may be case-sensitive.';
            self.error = true;
          });
        };
        this.restore = function () {
          $state.go('restore');
        };
      }
    ]
  });
