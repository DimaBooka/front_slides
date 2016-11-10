angular.
  module('SlidesApp').
  component('restorePassword', {
    templateUrl: 'components/restore-password/restore-password.template.html',
    controller: [ 'Auth', 'currentUserService','$rootScope', '$state',
      function (Auth, currentUserService, $rootScope, $state) {
        if ($rootScope.user){
          $state.go('presentations');
        }
        var self = this;
        self.sended = false;
        self.error = false;
        this.restoreEmail = function () {
          Auth.restorePass({}, {
            email: self.email
          }).$promise.then(
            function () {
              self.sended = true;
            }
          ).catch(function (error) {
            currentUserService.checkStatus(error);
            self.error = true;
            for (var key in error['data']) {
              if (key == 'error') {
                self.errorMes = error['data'][key];
              } else {
                self.errorMes = error['data'][key][0];
              }
            }
          })
        }
      }
    ]
  });
