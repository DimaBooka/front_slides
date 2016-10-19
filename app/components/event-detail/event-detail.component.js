angular.
  module('SlidesApp').
  component('eventDetail', {
    templateUrl: 'components/event-detail/event-detail.template.html',
    controller: ['Events', '$scope', '$routeParams',
      function (Events, $scope, $routeParams) {
        Events.get({id: $routeParams.id}).$promise
        .then(
          function (response) {
            $scope.event = response;
          });
      }
    ]
  });
