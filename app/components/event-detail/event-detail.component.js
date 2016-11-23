angular.
module('SlidesApp').
component('eventDetail', {
  templateUrl: 'components/event-detail/event-detail.template.html',
  controller: ['Event', 'WebSocket', 'currentUserService', '$scope', '$rootScope', '$stateParams', 'baseUrl', '$state',
  function (Event, WebSocket, currentUserService, $scope, $rootScope, $stateParams, baseUrl, $state) {
    var self = this;
    $scope.baseUrl = baseUrl;
    $scope.updateEventTrue = false;
    $scope.messages = new Array();
    $scope.room = $stateParams.id;
    $scope.muted = false;
    $scope.chatAble = false;
    
    $scope.firefox = navigator.userAgent.indexOf('Firefox') != -1;

    $scope.getEvent = function () {
      Event.get({id: $stateParams.id}).$promise.then(
        function (response) {
          $scope.event = response;
          if ($rootScope.user) {
            var currentUserId = $rootScope.user.id;
            if (currentUserId == response['presentation_info']['creator_info'].id) {
              $scope.name = response['name'];
              $scope.date_planned = new Date(response['date_planned']);
              $scope.date_started = new Date(response['date_started']);
              $scope.date_finished = new Date(response['date_finished']);
              $scope.updateEventAble = true;
            }
          }
        if ($scope.event.date_started && !$scope.event.date_finished) {
          $scope.eventLive = true;
          console.log('Live');
        }

        if ($scope.event.date_started && $scope.event.date_finished) {
          $scope.eventFinished = true;
        }
        }).catch(function (error){
          currentUserService.checkStatus(error);
        });
    };
    $scope.getEvent();

    $scope.updateTrueEvent = function () {
     $scope.updateEventTrue = !$scope.updateEventTrue;
    };

    $scope.updateEvent = function () {
     if (this.name) {
       $scope.error = false;
       Event.update({id: $stateParams.id},{
         name: this.name,
         date_planned: this.date_planned
       }).$promise.then(function () {
         $scope.getEvent();
         $scope.updateEventTrue = false;
         WebSocket.event('update');
       }).catch(function (error) {
         currentUserService.checkStatus(error);
         $scope.error = error['data']['non_field_errors'][0];
       });
     } else {
        $scope.error = 'The name could not consist of spaces only.';
     }
    };

  $scope.deleteEvent = function () {
    Event.delete({id: $stateParams.id}).$promise.then(function () {
      $state.go('events');
    });
  };

  $scope.fullscreen = function () {
    liveFrame = document.getElementById('presentation_live');
    liveFrame.contentWindow.postMessage('fullscreen', '*' );
  };

  $scope.startEvent = function () {
    Event.start({id: $stateParams.id}).$promise.then(function (response) {
      if (response.result == "started") {
        $scope.eventLive = true;
        WebSocket.event('start');
      }
      else {
        alert("Error: " + response.error);
      }
    });
  };

  $scope.pauseEvent = function (state) {
    if ($scope.muted) { $scope.muteAudio() }
    liveFrame = document.getElementById('presentation_live');
    liveFrame.contentWindow.postMessage(JSON.stringify({method: 'togglePause', args: [] }), '*' );
    liveFrame.contentWindow.postMessage('mute', '*' );
    $scope.eventPaused = state;
  };
  
  $scope.muteAudio = function () {
    liveFrame = document.getElementById('presentation_live');
    liveFrame.contentWindow.postMessage('mute', '*' );
    $scope.muted = !$scope.muted;
  };

  $scope.endEvent = function () {
    Event.end({id: $stateParams.id}).$promise.then(function (response) {
      liveFrame = document.getElementById('presentation_live');
       if (response.result == 'finished') {
        $scope.eventLive = false;
        WebSocket.event('end');
      }
      else {
        alert("Error: " + response.error);
      }
      $scope.eventFinished = true;
    });
  };

  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(messageEvent,function(e) {
    console.log(e);
    if (e.data == 'start') {
      $scope.$apply(function() {
        $scope.eventLive = true;
        $scope.eventFinished = false;
      });
    }
    if (e.data == 'end') {
      $scope.$apply(function() {
        $scope.eventLive = false;
        $scope.eventFinished = true;
      });
    }
    if (e.data == 'paused') {
      $scope.$apply(function() {
        $scope.eventPaused = true;
      });
    }
    if (e.data == 'unpaused') {
      $scope.$apply(function() {
        $scope.eventPaused = false;
      });
    }
  },false);

  $scope.sendInChat = function () {
    if (self.message) {
      if (self.message.length > 120) {
        alert('Your message is very long. Max size - 120');
        return
      }
      WebSocket.sendMessage(self.message, $stateParams.id);
      self.message = '';
    }
  };


  $scope.typeKeyHandler = function (event) {
    if (event.which == 13 && !event.shiftKey) {
      $scope.sendInChat();
      event.preventDefault();
    }
  };

  $scope.initChat = () => WebSocket.setRoom($stateParams.id);

  $scope.initMessage = () => {
    var objDiv = document.getElementById("messages");
      objDiv.scrollTop = objDiv.scrollHeight;
    };


  var addMessage = $rootScope.$on('chatMessage' + $scope.room, function (event, message) {
    $scope.messages.push(message);
  });
  $scope.$on('$destroy', addMessage);

  $rootScope.$on('chatMessages' + $stateParams.id, function (event, messages) {
    $scope.messages = messages;
    $scope.chatAble = true;
  });
}
]
})
.filter('trustAsResourceUrl', ['$sce', function($sce) {
  return function(val) {
    return $sce.trustAsResourceUrl(val);
  };
}]);
