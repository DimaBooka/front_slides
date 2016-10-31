angular.
  module('SlidesApp').
  component('eventList', {
    templateUrl: 'components/event-list/event-list.template.html',
    controller: ['Event', '$scope','$stateParams', '$rootScope',
      function (Event, $scope, $stateParams, $rootScope) {

        if ($stateParams.myEvents) {
          $scope.my = true;
          var userID = $rootScope.user.id;
          query = Event.myEvents({author_id: userID});
        } else if ($stateParams.public) {
          $scope.my = false;
          query = Event.query();
        } else {
          console.error("Not implemented");
          return;
        }

        query.$promise
        .then(
          function (response) {
            $scope.events = response;
          });
      }
    ]
  });
