angular.
  module('SlidesApp').
  component('eventList', {
    templateUrl: 'components/event-list/event-list.template.html',
    controller: ['Event', '$scope',
      function (Event, $scope) {
        Event.query().$promise
        .then(
          function (response) {
            $scope.events = response;
          });
      }
    ]
  });
