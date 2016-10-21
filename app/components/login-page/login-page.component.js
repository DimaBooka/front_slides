angular.
  module('SlidesApp').
  component('loginPage', {
    templateUrl: 'components/login-page/login-page.template.html',
    controller: [ 'Auth', '$http', '$rootScope', '$state',
      function (Auth, $httpProvider, $rootScope, $state) {
        var self = this;
        self.error = false;
        this.login = function () {
          Auth.login({}, {
            username: self.username,
            password: self.password
          }).$promise.then( function (data) {
            localStorage['token'] = data.key;
            $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + data.key;
            $rootScope.token = data.key;
            Auth.currentUser().$promise.then(
              function (response) {
                localStorage['user'] = JSON.stringify(response);
                localStorage['profileMenu'] = JSON.stringify([true, false, false]);
              }
            );
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
