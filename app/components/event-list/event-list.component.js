angular.
  module('SlidesApp').
  component('eventList', {
    templateUrl: 'components/event-list/event-list.template.html',
    controller: ['Events', '$scope',
      function (Events, $scope) {
        Events.query().$promise
        .then(
          function (response) {
            $scope.events = response;
          });
      }
    ]
  });
