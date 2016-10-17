angular.
  module('SlidesApp').
  component('loginPage', {
    templateUrl: 'components/login-page/login-page.template.html',
    controller: [ 'AuthorizService',
      function (AuthorizService) {
        var self = this;
        this.login = function () {
          AuthorizService.save({}, {
            username: self.username,
            password: self.password
          })
        }
      }
    ]
  });