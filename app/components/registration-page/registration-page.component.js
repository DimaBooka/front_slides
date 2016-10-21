angular.
  module('SlidesApp').
  component('registrationPage', {
    templateUrl: 'components/registration-page/registration-page.template.html',
    controller: ['Auth', '$http', '$rootScope',
      function (Auth, $httpProvider, $rootScope) {
        var self = this;
        self.registred = false;
        self.error = false;
        this.registration = function () {
          Auth.register({}, {
            username: self.username,
            password1: self.password1,
            password2: self.password2,
            email: self.email
          }).$promise.then(function (data) {
            localStorage['token'] = data.key;
            $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + data.key;
            $rootScope.token = data.key;
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