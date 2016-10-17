angular.
  module('SlidesApp').
  component('registrationPage', {
    templateUrl: 'components/registration-page/registration-page.template.html',
    controller: [ 'RegistraService',
      function (RegistraService) {
        var self = this;
        this.registration = function () {
          RegistraService.save({}, {
            username: self.username,
            password1: self.password1,
            password2: self.password2,
            email: self.email
          })
        }
      }
    ]
  });