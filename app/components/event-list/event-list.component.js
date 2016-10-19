angular.
  module('SlidesApp').
  component('eventList', {
    templateUrl: 'components/event-list/event-list.template.html',
    controller: ['getEventList', '$scope',
      function (getEventList, $scope) {
        getEventList.query().$promise
        .then(
          function (response) {
            $scope.events = response;
          });
      }
    ]
  });
