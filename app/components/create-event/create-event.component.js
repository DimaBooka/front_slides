/**
 * Created by user on 25.10.16.
 */
angular.
  module('SlidesApp').
  component('createEvent', {
    templateUrl: 'components/create-event/create-event.template.html',
    controller: ['$scope', 'currentUserService', 'Event', '$stateParams', '$rootScope',
      function ($scope, currentUserService, Event, $stateParams, $rootScope) {
        var date = new Date();
        date = date.toISOString().substring(0,16);
        $scope.curDate = new Date(Date.parse(date));
        $scope.date = $scope.curDate;
        $scope.created = false;
        $scope.currentUserId = $rootScope.user.id;
        $scope.createEventNew = function () {
          $scope.date = new Date(this.date);
          Event.save({}, {
            name: this.name,
            presentation: $stateParams.id,
            author: $scope.currentUserId,
            date: $scope.date
          }).$promise.then(function () {
            $scope.created = true;
            $scope.$parent.message.text="add"
            $scope.$parent.trueCreate();
          });
        };
        $scope.createdSuccess = function () {
          $scope.created = false;
        }
      }
    ]
  });
