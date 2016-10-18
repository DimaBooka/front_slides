angular.
  module('SlidesApp').
  component('loginPage', {
    templateUrl: 'components/login-page/login-page.template.html',
    controller: [ 'AuthorizService', '$http', '$location', '$rootScope',
      function (AuthorizService, $httpProvider, $location, $rootScope) {
        var self = this;
        this.login = function () {
          AuthorizService.save({}, {
            username: self.username,
            password: self.password
          }).$promise.then( function (data) {              
            localStorage['token'] = data.key;
            $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + data.key;
            $rootScope.token = data.key;
            $location.path('/');
          });
        }
      }
    ]
  });