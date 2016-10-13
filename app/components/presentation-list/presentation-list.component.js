angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: ['GetPresentationsService', 'AuthorizService', '$scope',
      function (GetPresentationsService, AuthorizService, $scope) {
        AuthorizService.save({},{username:'booka', password:'samsung777'});
        $scope.public_presentations = GetPresentationsService.query();
      }
    ]
  });
