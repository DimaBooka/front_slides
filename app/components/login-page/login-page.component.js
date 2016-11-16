angular.
  module('SlidesApp').
  component('loginPage', {
    templateUrl: 'components/login-page/login-page.template.html',
    controller: [ 'Auth', 'currentUserService', 'FacebookAuth','GoogleAuth', '$rootScope', '$state',
      function (Auth, currentUserService, FacebookAuth, GoogleAuth, $rootScope, $state) {
        if ($rootScope.user){
          $state.go('presentations');
        } else {
          $rootScope.facebookErrors = false;
          var self = this;
          currentUserService.unsetToken();
          currentUserService.unsetUser();
          self.error = false;
          FacebookAuth.fbInit();
          this.login = function () {
            self.error = false;
            currentUserService.login(this.username, this.password).then(function () {
              $state.go('presentations');
            }).catch(function (error) {
              currentUserService.checkStatus(error);
              self.errors = [];
              for (var key in error['data']) {
                self.errors.push(error['data'][key][0]);
              }
              self.error = true;
            });
          };
          this.restore = function () {
            $state.go('restore');
          };
          this.facebookLogin = function () {
            self.error = false;
            FacebookAuth.watchLoginChange();
          };
          this.googleLogin = function () {
            self.error = false;
            GoogleAuth.googleLogin();
          };
        }
      }
    ]
  });
