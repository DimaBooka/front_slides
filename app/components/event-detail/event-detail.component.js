angular.
  module('SlidesApp').
  component('eventDetail', {
    templateUrl: 'components/event-detail/event-detail.template.html',
    controller: ['Event', '$scope', '$routeParams',
      function (Event, $scope, $routeParams) {
        Event.get({id: $routeParams.id}).$promise
        .then(
          function (response) {
            $scope.event = response;
          });
      }
    ]
  });
