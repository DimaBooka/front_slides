angular.module('socketService', ['ngWebSocket'])
.factory('WebSocket', ['$websocket', 'socketAddr', '$stateParams', '$rootScope', 'currentUserService',
  function($websocket, socketAddr, $stateParams, $rootScope, currentUserService) {

    var user_room = null;
    var socket = null;
    function start_socket() {
      if (socket == null)
        socket = $websocket(socketAddr);
      else
        return

      socket.onOpen(function() {
        console.log("Connected!");
        if (user_room) {
          socket.send(JSON.stringify({
            'register': true,
            'token': $rootScope.token,
            'room': user_room,
            'from': 'chat',
          }));  
        }
        $rootScope.$emit('socketOpened');
      });

      socket.onError(function(error) {
          console.log("Chat Error:", error);
      });

      socket.onMessage(function(e) {
        var data = JSON.parse(e.data);
        console.log(data);
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
        socket.close();
        socket = null;
        setTimeout(start_socket, 1000);
      });
    }
    
    var methods = {
      setRoom: function(room) {
        user_room = room;
        start_socket();
      },

      sendMessage: function(text, room) {
        var data = {'text': text, 'room': room, 'from': 'chat', 'token': $rootScope.token};
        socket.send(JSON.stringify(data));
        console.log("Message sent. ", JSON.stringify(data));
      },

      event: function(state) {
        var data = {'from': 'reveal', 'event': state, 'socketId': user_room};
        socket.send(JSON.stringify(data));
        console.log("Message sent. ", JSON.stringify(data));
      }
    };
    return methods;
  }
]);
