angular.module('socketService', ['ngWebSocket'])
.factory('WebSocket', ['$websocket', 'socketAddr', '$stateParams', '$rootScope', 'currentUserService',
  function($websocket, socketAddr, $stateParams, $rootScope, currentUserService) {

    var socket = null;
    function start_socket(addres) {
      socket = $websocket(addres);

      socket.onOpen(function() {
        console.log("Connected!");
        $rootScope.$emit('socketOpened');
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
        setTimeout(function() {
              start_socket(addres)
          }, 1000);
      });
    }
    start_socket(socketAddr);

    var methods = {
      getChatHistory: function(room) {
        console.log('get chet history', $rootScope.token, room);
        socket.send(JSON.stringify({
          'register': true,
          'token': $rootScope.token,
          'room': room,
          'from': 'chat',
        }));
      },

      sendMessage: function(text, room) {
        var data = {'text': text, 'room': room, 'from': 'chat', 'token': $rootScope.token};
        socket.send(JSON.stringify(data));
        console.log("Message sent. ", JSON.stringify(data));
      }
    };
    return methods;
  }
]);
