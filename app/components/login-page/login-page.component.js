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
          }).catch(function (error) {
            self.error = true;
            self.errors = [];
            for (var key in error['data']){
              self.errors.push(error['data'][key][0]);
            }
          });
        };
        this.restore = function () {
          $state.go('restore');
        };
        this.facebookLogin = function () {
          FacebookAuth.watchLoginChange();
        };
        this.googleLogin = function () {
          GoogleAuth.googleLogin();
        };
      }
    ]
  });
