angular.
  module('SlidesApp').
  component('eventDetail', {
    templateUrl: 'components/event-detail/event-detail.template.html',
    controller: ['Event', '$scope', '$stateParams', 'baseUrl',
      function (Event, $scope, $stateParams, baseUrl) {
        $scope.baseUrl = baseUrl;
        Event.get({id: $stateParams.id}).$promise
        .then(
          function (response) {
            $scope.event = response;
          });
      }
    ]
  })
  .filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);
