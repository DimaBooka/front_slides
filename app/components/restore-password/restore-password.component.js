angular.
  module('SlidesApp').
  component('restorePassword', {
    templateUrl: 'components/restore-password/restore-password.template.html',
    controller: [ 'Auth', '$location',
      function (Auth, $location) {
        var self = this;
        self.sended = false;
        this.restoreEmail = function () {
          Auth.restorePass({}, {
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
