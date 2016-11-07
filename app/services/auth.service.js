angular.module('authService', [])
 .factory('Auth', ['$resource', 'baseUrl',
    function($resource, baseUrl) {
      return $resource(baseUrl + '/api/rest-auth/:operation/:afterOperation/', {}, {
        login: {
          method: 'POST',
          params: {
            operation: 'login',
          },
        },
        register: {
          method: 'POST',
          params: {
            operation: 'registration',
          },
        },
        logout: {
          method: 'POST',
          params: {
            operation: 'logout',
          },
        },
        changePass: {
          method: 'POST',
          params: {
            operation: 'password',
            afterOperation: 'change',
          },
        },
        restorePass: {
          method: 'POST',
          params: {
            operation: 'password',
            afterOperation: 'reset',
          },
        },
        currentUser: {
          method: 'GET',
          params: {
            operation: 'user',
          },
        },
        updateUser: {
          method: 'PATCH',
          params: {
            operation: 'user',
          },
        },
        facebookLogin: {
          method: 'POST',
          params: {
            operation: 'facebook',
          },
        },
        googleLogin: {
          method: 'POST',
          params: {
            operation: 'google',
          },
        },
      });
    }
 ])
 .service('currentUserService', ['Auth', '$rootScope', '$http', '$state',
   function(Auth, $rootScope, $httpProvider, $state) {
     this.loadUserFromLS = function () {
       if (localStorage['user'])
         this.setUser(JSON.parse(localStorage['user']));
     };

     this.loadTokenFromLS = function () {
       if (localStorage['token'])
         this.setToken(localStorage['token']);
     };

     this.loadUserFromAPI = function () {
       Auth.currentUser().$promise.then(this.setUser.bind(this));
     };

     this.setUser = function (user) {
       $rootScope.user = user;
       localStorage['user'] = JSON.stringify(user);
     };

     this.setToken = function (token) {
       $rootScope.token = token;
       localStorage['token'] = token;
       $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + token;
     };

     this.unsetUser = function () {
       $rootScope.user = undefined;
       localStorage.removeItem('user');
     };

     this.unsetToken = function () {
       $rootScope.token = undefined;
       localStorage.removeItem('token');
       delete $httpProvider.defaults.headers.common['Authorization'];
     };

     this.logout = function () {
       return Auth.logout({
         'token': $rootScope.token
       }).$promise.then(function (response) {
         this.unsetUser();
         this.unsetToken();
         return response
       }.bind(this));
     };

     this.login = function(username, password) {
       return Auth.login({}, {
         'username': username,
         'password': password
       }).$promise.then(function (data) {
         this.setToken(data.key);
         this.loadUserFromAPI();
         return data;
       }.bind(this));
     };

     this.register = function(username, password1, password2, email) {
       return Auth.register({}, {
            'username': username,
            'password1': password1,
            'password2': password2,
            'email': email
          }).$promise;
     };

     this.checkStatus = function (error) {
       if (error.data['detail'] == "Invalid token."){
         this.unsetToken();
         this.unsetUser();
         $state.go('login');
       } else if (error.data['detail'] == "Not found.") {
         $state.go('notFound');
       }
     }
   }]
 );