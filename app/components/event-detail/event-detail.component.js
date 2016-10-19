angular.
  module('SlidesApp').
  component('eventDetail', {
    templateUrl: 'components/event-detail/event-detail.template.html',
    controller: ['getEventDetail', '$scope',
      function (getEventDetail, $scope) {
        getEventDetail.query().$promise
        .then(
          function (response) {
            $scope.event = response;
          });
      }
    ]
  });
