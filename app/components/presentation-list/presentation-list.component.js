angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: ['Presentation', 'currentUserService', '$scope', '$stateParams', '$rootScope',
      function (Presentation, currentUserService, $scope, $stateParams, $rootScope) {
        var query;

        if ($stateParams.my) {
          $scope.my = true;
          var userID = $rootScope.user.id;
          query = Presentation.query({creator_id: userID});
        } else if ($stateParams.published) {
          $scope.my = false;
          query = Presentation.published();
        } else {
          console.error("Not implemented");
          return;
        }

        query.$promise.then(function (response) {
          $scope.public_presentations = response;
        }).catch(function (error) {
          currentUserService.checkStatus(error);
        });
      }
    ]
  });
