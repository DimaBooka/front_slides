angular.
  module('SlidesApp').
  component('registrationPage', {
    templateUrl: 'components/registration-page/registration-page.template.html',
    controller: ['Auth',
      function (Auth) {
        var self = this;
        self.registred = false;
        self.error = false;
        this.registration = function () {
          Auth.register({}, {
            username: self.username,
            password1: self.password1,
            password2: self.password2,
            email: self.email
          }).$promise.then(function () {
            self.registred = true;
          }).catch(function (error) {
            self.error = true;
            self.errorList = [];
            for (var key in error['data']){
              self.errorList.push(error['data'][key][0]);
            }
          })
        }
      }
    ]
  });