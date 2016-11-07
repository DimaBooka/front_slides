angular.
  module('SlidesApp').
  component('eventList', {
    templateUrl: 'components/event-list/event-list.template.html',
    controller: ['Event', '$scope','$stateParams', '$rootScope', 'currentUserService', '$state', 'pageSize',
      function (Event, $scope, $stateParams, $rootScope, currentUserService, $state, pageSize) {
        var query;
        var page = parseInt($stateParams.page);
        $scope.getEvents = function(page) {
          if ($stateParams.myEvents) {
            if (!$rootScope.user){
              $state.go('login');
            } else {
              $scope.my = true;
              var userID = $rootScope.user.id;
              query = Event.myEvents({page: page, author: userID});
            }
          } else if ($stateParams.public) {
            $scope.my = false;
            today = new Date();
            query = Event.query({page: page, date_planned__gte: today.toISOString().substring(0, 19).replace('T', ' '), date_finished__isnull: 'True'});
          } else if ($stateParams.history) {
            $scope.history = true;
            $scope.my = false;
            today = new Date();
            query = Event.query({page: page, date_finished__lte: today.toISOString().substring(0, 19).replace('T', ' ')});
          } else {
            console.error("Not implemented");
            return;
          }
          if (query) {
            query.$promise
              .then(
                function (response) {
                  $scope.pages = Array.apply(null, Array(Math.ceil(response.count / pageSize))).map(function (_, i) {return i + 1;});
                  $scope.events = response.results;
                }).catch(function (error) {
                currentUserService.checkStatus(error);
              }
            );
          }
        }

        $scope.getEvents(page);
      }
    ]
  });
