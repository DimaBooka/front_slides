angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: ['GetPresentationsService', '$scope', 
       function (GetPresentationsService, $scope) {
          $scope.public_presentations = GetPresentationsService.query()
        } 
    ]
  });
