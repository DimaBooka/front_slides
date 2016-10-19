angular.
  module('SlidesApp').
  component('restorePassword', {
    templateUrl: 'components/restore-password/restore-password.template.html',
    controller: [ 'RestorePasswordService', '$location',
      function (RestorePasswordService, $location) {
        var self = this;
        self.sended = false;
        this.restoreEmail = function () {
          RestorePasswordService.save({}, {
            email: self.email
          }).$promise.then(
            function () {
              self.sended = true;
            }
          )
        }
      }
    ]
  });
