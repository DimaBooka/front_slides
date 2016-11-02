angular.
  module('SlidesApp').
  component('confirmEmail', {
    templateUrl: 'components/confirm-email/confirm-email.template.html',
    controller: [ '$stateParams', '$scope',
      function ($stateParams, $scope) {
        $scope.key = $stateParams.key;
      }
    ]
  });
