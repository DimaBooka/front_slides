angular.
  module('SlidesApp').
  component('loginPage', {
    templateUrl: 'components/login-page/login-page.template.html',
    controller: [ 'AuthorizService', '$http', '$location', '$rootScope',
      function (AuthorizService, $httpProvider, $location, $rootScope) {
        var self = this;
        self.error = false;
        this.login = function () {
          AuthorizService.save({}, {
            username: self.username,
            password: self.password
          }).$promise.then( function (data) {
            localStorage['token'] = data.key;
            $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + data.key;
            $rootScope.token = data.key;
            $location.path('/');
          }).catch(function () {
            self.errorMes = 'Please enter a correct username and password. Note that both fields may be case-sensitive.';
            self.error = true;
          });
        };
        this.restore = function () {
          $location.path('/restore');
        };
      }
    ]
  });
