angular.
  module('SlidesApp').
  component('eventList', {
    templateUrl: 'components/event-list/event-list.template.html',
    controller: ['Event', '$scope','$stateParams', '$rootScope',
      function (Event, $scope, $stateParams, $rootScope) {

        if ($stateParams.myEvents) {
          $scope.my = true;
          var userID = $rootScope.user.id;
          query = Event.myEvents({author: userID});
        } else if ($stateParams.public) {
          $scope.my = false;
          today = new Date();
          query = Event.query({date_planned__gte: today.toISOString().substring(0, 19).replace('T', ' ')});
        } else if ($stateParams.history) {
          $scope.history = true;
          $scope.my = false;
          today = new Date();
          query = Event.query({date_finished__lte: today.toISOString().substring(0, 19).replace('T', ' ')});
        } else {
          console.error("Not implemented");
          return;
        }

        query.$promise
        .then(
          function (response) {
            $scope.events = [];
            if ($stateParams.public) {
              for (i in response) {
                if (!response[i].date_finished && !response[i].date_started && response[i].date_planned){
                  $scope.events.push(response[i]);
                }
              }
            } else {
              $scope.events = response;
            }
          });
      }
    ]
  });
