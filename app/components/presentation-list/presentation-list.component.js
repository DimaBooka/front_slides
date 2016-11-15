angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: ['Presentation', 'currentUserService', '$scope', '$stateParams', '$state', '$rootScope', 'pageSize',
      function (Presentation, currentUserService, $scope, $stateParams, $state, $rootScope, pageSize) {
        var query;
        var page = parseInt($stateParams.page);
        $scope.public_presentations = true;
        $scope.getPresentations = function(page) {
        if ($stateParams.my) {
          if (!$rootScope.user){
            $state.go('login');
          } else {
            $scope.my = true;
            var userID = $rootScope.user.id;
            query = Presentation.query({creator_id: userID, page: page});
          }
        } else if ($stateParams.published) {
          $scope.my = false;
          query = Presentation.published({page: page});
        } else {
          console.error("Not implemented");
          return;
        }
        if (query) {
          query.$promise.then(function (response) {
            $scope.pages = Array.apply(null, Array(Math.ceil(response.count / pageSize))).map(function (_, i) {return i + 1;});
            $scope.public_presentations = response.results;
            if (!$scope.public_presentations.length) {
              $scope.public_presentations = false;
            }
          }).catch(function (error) {
            currentUserService.checkStatus(error);
          });
        }
      }
      
      $scope.getPresentations(page);
    }
    ]
  });
