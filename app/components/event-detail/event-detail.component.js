angular.
module('SlidesApp').
component('eventDetail', {
  templateUrl: 'components/event-detail/event-detail.template.html',
  controller: ['Event', 'WebSocket', 'currentUserService', '$scope', '$rootScope', '$stateParams', 'baseUrl', '$state', '$rootScope',
  function (Event, WebSocket, currentUserService, $scope, $rootScope, $stateParams, baseUrl, $state, $rootScope) {
    var self = this;
    $scope.baseUrl = baseUrl;
    $scope.updateEventTrue = false;
    $scope.messages = new Array();
    $scope.room = $stateParams.id;

    $scope.getEvent = function () {
      Event.get({id: $stateParams.id}).$promise.then(
        function (response) {
          $scope.event = response;
          if ($rootScope.user) {
            var currentUserId = $rootScope.user.id;
            if (currentUserId == response['presentation_info']['creator_info'].id) {
              $scope.name = response['name'];
              var date = response['date'];
              $scope.date = new Date(date);
              $scope.updateEventAble = true;
            }
            if ($scope.event.state == 5) {
              $scope.eventLive = true;
            }
          }
        });

    };
    $scope.getEvent();

    $scope.updateTrueEvent = function () {
     $scope.updateEventTrue = !$scope.updateEventTrue;
   };

   $scope.updateEvent = function () {
    Event.update({id: $stateParams.id},{
      name: this.name,
      date: this.date
    }).$promise.then(function () {
      $scope.getEvent();
      $scope.updateEventTrue = false;
    }).catch(function (error) {
              $scope.error = error['data']['date'][0];
    });
  };

  $scope.deleteEvent = function () {
    Event.delete({id: $stateParams.id}).$promise.then(function () {
      $state.go('events');
    });
  };

  $scope.startEvent = function () {
    Event.start({id: $stateParams.id}).$promise.then(function (response) {
      liveFrame = document.getElementById('presentation_live');
      if (response.state == "live") {
        liveFrame.src = liveFrame.src;
        $scope.eventLive = true;
      }
      else {
        alert("Error: " + response.error);
      }
    });
  };

  $scope.pauseEvent = function (state) {
    liveFrame = document.getElementById('presentation_live');
    liveFrame.contentWindow.postMessage(JSON.stringify({method: 'togglePause', args: [] }), '*' );
    $scope.eventPaused = state;
  };

  $scope.endEvent = function () {
    Event.end({id: $stateParams.id}).$promise.then(function (response) {
      liveFrame = document.getElementById('presentation_live');
      if (response.state == "done") {
        liveFrame.src = liveFrame.src; 
        $scope.eventLive = false;
      }
      else {
        alert("Error: " + response.error);
      }
      
    });
  };

  $scope.sendInChat = function () {
    WebSocket.sendMessage(self.message, $scope.room);
    console.log(self.message);
    self.message = '';
  }

  $scope.initChat = () => WebSocket.getChatHistory($scope.room);

  $scope.initMessage = () => {
    var objDiv = document.getElementById("messages");
      objDiv.scrollTop = objDiv.scrollHeight;
    };


  $rootScope.$on('chatMessage' + $scope.room, function (event, message) {
    $scope.messages.push(message);  
  });

  $rootScope.$on('chatMessages' + $scope.room, function (event, messages) {

    messages.forEach(function (message){
      $scope.messages.push(message);
    });
  });
}
]
})
.filter('trustAsResourceUrl', ['$sce', function($sce) {
  return function(val) {
    return $sce.trustAsResourceUrl(val);
  };
}]);
