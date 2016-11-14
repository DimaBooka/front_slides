angular.
  module('SlidesApp').
  component('confirmEmail', {
    templateUrl: 'components/confirm-email/confirm-email.template.html',
    controller: [ '$stateParams', '$scope', '$state', '$rootScope',
      function ($stateParams, $scope, $state, $rootScope) {
        $scope.key = $stateParams.key;
      }
    ]
  });
