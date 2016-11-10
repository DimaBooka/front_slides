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
        self.registred = false;
        self.error = false;
        this.registration = function () {
          currentUserService.register(this.username, this.password1, this.password2, this.email).then(
            function () {
              self.registred = true;
          }).catch(function (error) {
            currentUserService.checkStatus(error);
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