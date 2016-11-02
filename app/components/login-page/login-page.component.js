angular.
  module('SlidesApp').
  component('loginPage', {
    templateUrl: 'components/login-page/login-page.template.html',
    controller: [ 'Auth', 'currentUserService', 'FacebookAuth','GoogleAuth', '$rootScope', '$state',
      function (Auth, currentUserService, FacebookAuth, GoogleAuth, $rootScope, $state) {
        var self = this;
        self.error = false;
        FacebookAuth.fbInit();
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
        function test() {
          console.log('22222222');
        }
        this.facebookLogin = function () {
          FacebookAuth.watchLoginChange();
        };
        this.googleLogin = function () {
          GoogleAuth.googleLogin();
        };
      }
    ]
  });
