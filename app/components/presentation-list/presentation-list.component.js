angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: ['Presentation', '$scope',
      function (Presentation, $scope) {
        Presentation.published().$promise
        .then(
          function (response) {
            $scope.public_presentations = response;
          });
      }
    ]
  });
