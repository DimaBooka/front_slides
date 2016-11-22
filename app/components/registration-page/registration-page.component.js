angular.
  module('SlidesApp').
  component('registrationPage', {
    templateUrl: 'components/registration-page/registration-page.template.html',
    controller: ['Auth', 'currentUserService', '$rootScope', '$state',
      function (Auth, currentUserService, $rootScope, $state) {
        if ($rootScope.user){
          $state.go('presentations');
        }
        var self = this;
        self.timezone = "Europe/Kiev";
        self.registred = false;
        this.registration = function () {
          self.error = false;
          self.errorList = [];
          var birth_date = null;
          if (this.birth_date) {
            if (new Date() / 1 > this.birth_date.getTime() && new Date(1900, 1 , 1) / 1 < this.birth_date.getTime()) {
              birth_date = this.birth_date;
              birth_date = [birth_date.getUTCFullYear(), birth_date.getMonth() + 1, birth_date.getDate()].join('-');
            } else {
              self.errorList = ['Check the entered date.'];
              self.error = true;
            }
          }
          if (!self.error) {
            currentUserService.register(this.username, this.password1, this.password2, this.email, birth_date, this.gender, this.first_name, this.last_name, this.timezone).then(
                function () {
                  self.registred = true;
                }).catch(function (error) {
              currentUserService.checkStatus(error);
              self.error = true;
              self.errorList = [];
              for (var key in error['data']) {
                self.errorList.push(error['data'][key][0]);
              }
            })
          }
        }
      }
    ]
  });
