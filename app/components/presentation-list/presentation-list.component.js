angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: ['GetPresentationsService', 'AuthorizService', '$scope',
      function (GetPresentationsService, AuthorizService, $scope) {
        GetPresentationsService.query().$promise
        .then(
          function (response) {
            $scope.public_presentations = response;
          });
      }
    ]
  });
