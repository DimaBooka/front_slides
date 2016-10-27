angular.
  module('SlidesApp').
  component('registrationPage', {
    templateUrl: 'components/registration-page/registration-page.template.html',
    controller: ['Auth', 'currentUserService',
      function (Auth, currentUserService) {
        var self = this;
        self.registred = false;
        self.error = false;
        this.registration = function () {
          currentUserService.register(this.username, this.password1, this.password2, this.email).then(
            function () {
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