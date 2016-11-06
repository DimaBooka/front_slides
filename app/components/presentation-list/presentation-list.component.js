angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: ['Presentation', 'currentUserService', '$scope', '$stateParams', '$rootScope', '$state',
      function (Presentation, currentUserService, $scope, $stateParams, $rootScope, $state) {
        var query;

        if ($stateParams.my) {
          if (!$rootScope.user){
            $state.go('login');
          } else {
            $scope.my = true;
            var userID = $rootScope.user.id;
            query = Presentation.query({creator_id: userID});
          }
        } else if ($stateParams.published) {
          $scope.my = false;
          query = Presentation.published();
        } else {
          console.error("Not implemented");
          return;
        }
        if (query) {
          query.$promise.then(function (response) {
            $scope.public_presentations = response;
          }).catch(function (error) {
            currentUserService.checkStatus(error);
          });
        }
      }
    ]
  });
