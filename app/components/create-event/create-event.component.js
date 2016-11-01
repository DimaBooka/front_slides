/**
 * Created by user on 25.10.16.
 */
angular.
  module('SlidesApp').
  component('createEvent', {
    templateUrl: 'components/create-event/create-event.template.html',
    controller: ['$scope', 'currentUserService', 'Event', '$stateParams', '$rootScope', '$state',
      function ($scope, currentUserService, Event, $stateParams, $rootScope, $state) {
        $scope.date = new Date();
        $scope.created = false;
        $scope.currentUserId = $rootScope.user.id;
        $scope.createEventNew = function () {
          $scope.date = new Date(this.date);
          Event.save({}, {
            name: this.name,
            presentation: $stateParams.id,
            author: $scope.currentUserId,
            date_planned: $scope.date
          }).$promise.then(function (res) {
            $scope.created = true;
            $scope.$parent.trueCreate();
            $state.go('event-detail', {id:res.id})
          }).catch(function (error) {
              $scope.error = error['data']['non_field_errors'][0];
          });
        };
        $scope.createdSuccess = function () {
          $scope.created = false;
        }
      }
    ]
  });
