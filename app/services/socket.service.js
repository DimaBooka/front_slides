angular.module('socketService', ['ngWebSocket'])
.factory('WebSocket', ['$websocket', 'socketAddr', '$stateParams', '$rootScope', 'currentUserService',
  function($websocket, socketAddr, $stateParams, $rootScope, currentUserService) {
    var socket = $websocket(socketAddr);
    var isopen = false;

    socket.onOpen(function() {
      console.log("Connected!");
      isopen = true;
      $rootScope.$emit('socketOpened');
    });

    socket.onMessage(function(e) {
      var data = JSON.parse(e.data);

      if (data.message) {
        console.log('service', data, data.room);
        $rootScope.$emit('chatMessage' + data.room, data);
      }

      if (data.messages) {
        console.log('service', data, data.room);
        $rootScope.$emit('chatMessages' + data.room, data.messages);
      }
    });

    socket.onClose(function(e) {
      console.log('Connection closed: ', e);
      socket = null;
      isopen = false;
    });

    var methods = {
      getChatHistory: function(room) {
        socket.send(JSON.stringify({
          'token': $rootScope.token,
          'room': room,
          'from': 'chat',
        }));
      },

      sendMessage: function(text, room) {
        var data = {'text': text, 'room': room, 'from': 'chat'};
        if (isopen) {
          socket.send(JSON.stringify(data));
          console.log("Message sent. ", JSON.stringify(data));
        } 
        else {
          console.log("Connection not opened.")
       }
      }
    };
    return methods;
  }
]);
