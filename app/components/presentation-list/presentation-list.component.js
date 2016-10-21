angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: ['Presentation', '$scope', '$stateParams',
      function (Presentation, $scope, $stateParams) {
        var query;

        if ($stateParams.my) {
          var userID = JSON.parse(localStorage['user']).id;
          query = Presentation.query({creator_id: userID});
        } else if ($stateParams.published) {
          query = Presentation.published();
        } else {
          console.error("Not implemented");
          return;
        }

        query.$promise.then(function (response) {
          $scope.public_presentations = response;
        });
      }
    ]
  });
