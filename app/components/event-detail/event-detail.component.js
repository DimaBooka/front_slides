angular.
  module('SlidesApp').
  component('eventDetail', {
    templateUrl: 'components/event-detail/event-detail.template.html',
    controller: ['Event', '$scope', '$stateParams',
      function (Event, $scope, $stateParams) {
        Event.get({id: $stateParams.id}).$promise
        .then(
          function (response) {
            $scope.event = response;
          });
      }
    ]
  });
