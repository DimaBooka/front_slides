/**
 * Created by user on 25.10.16.
 */
angular.
  module('SlidesApp').
  component('createEvent', {
    templateUrl: 'components/create-event/create-event.template.html',
    controller: ['$scope', 'Event', '$stateParams',
      function ($scope, Event, $stateParams) {
        $scope.created = false;
        $scope.createEventNew = function () {
          Event.save({}, {
            name: $scope.name,
            presentation: $stateParams.id,
            author: JSON.parse(localStorage['user']).id,
            date: $scope.date,
            state: $scope.state
          }).$promise.then(function () {
            $scope.created = true;
          }).catch(function () {
            debugger;
          });
        };
        $scope.createdSuccess = function () {
          $scope.created = false;
        }
      }
    ]
  });
