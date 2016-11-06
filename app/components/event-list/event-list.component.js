angular.
  module('SlidesApp').
  component('eventList', {
    templateUrl: 'components/event-list/event-list.template.html',
    controller: ['Event', '$scope','$stateParams', '$rootScope', 'currentUserService', '$state',
      function (Event, $scope, $stateParams, $rootScope, currentUserService, $state) {

        if ($stateParams.myEvents) {
          if (!$rootScope.user){
            $state.go('login');
          } else {
            $scope.my = true;
            var userID = $rootScope.user.id;
            query = Event.myEvents({author: userID});
          }
        } else if ($stateParams.public) {
          $scope.my = false;
          today = new Date();
          query = Event.query({date_planned__gte: today.toISOString().substring(0, 19).replace('T', ' '), date_started__isnull: 'True'});
        } else if ($stateParams.history) {
          $scope.history = true;
          $scope.my = false;
          today = new Date();
          query = Event.query({date_finished__lte: today.toISOString().substring(0, 19).replace('T', ' ')});
        } else {
          console.error("Not implemented");
          return;
        }
        if (query) {
          query.$promise
            .then(
              function (response) {
                $scope.events = response;
              }).catch(function (error) {
              currentUserService.checkStatus(error);
            }
          );
        }
      }
    ]
  });
