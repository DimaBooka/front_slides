/**
 * Created by user on 25.10.16.
 */
angular.
  module('SlidesApp').
  component('createEvent', {
    templateUrl: 'components/create-event/create-event.template.html',
    controller: ['$scope', 'Event', 'Presentation', '$stateParams',
      function ($scope, Event, Presentation, $stateParams) {
        var date = new Date();
        date = date.toISOString().substring(0,16);
        $scope.curDate = new Date(Date.parse(date));
        $scope.date = $scope.curDate;
        $scope.created = false;
        Presentation.get({id: $stateParams.id}).$promise.then(
          function (response) {
            $scope.creator = response.creator;
          }
        );
        $scope.currentUserId = JSON.parse(localStorage['user']).id;
        $scope.createEventNew = function () {
          $scope.date = new Date(this.date);
          debugger;
          Event.save({}, {
            name: this.name,
            presentation: $stateParams.id,
            author: JSON.parse(localStorage['user']).id,
            date: $scope.date
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
