/**
 * Created by user on 28.10.16.
 */
angular.module('googleService', [])
 .service('GoogleAuth', [ '$state', 'Auth', 'currentUserService',
   function($state, Auth, currentUserService) {
     var apiKey = 'ULvebEhtuDzq9m9VJljtAZ2O';
     var clientId = '816931206688-dbg498t3fc541ouk205bv9365vblto21.apps.googleusercontent.com';
     var scopes = 'profile';
     // Get authorization from the user to access profile info
     function initAuth() {
       gapi.client.setApiKey(apiKey);
       gapi.auth2.init({
           client_id: clientId,
           scope: scopes
       });
       var signinButton = document.getElementById('signin-button');
       signinButton.addEventListener("click", auth);
     }
     function auth() {
       gapi.auth2.getAuthInstance().signIn().then(function (res) {
         Auth.googleLogin({}, {
           'access_token': res['Zi']['access_token']
         }).$promise.then(function (data) {
           currentUserService.setToken(data.key);
           currentUserService.loadUserFromAPI();
           Auth.currentUser().$promise.then(
            function (response) {
              if (!response.all_fields_completed) {
                var userInfo = {};
                if (Date.parse(response.birth_date)) {
                  response.birth_date = new Date(response.birth_date);
                  userInfo.birth_date = response.birth_date;
                } else {
                  userInfo.birth_date = null;
                }
                userInfo.first_name = response.first_name;
                userInfo.last_name = response.last_name;
                userInfo.gender = response.gender;
                var isFalse = false;
                for (var key in userInfo) {
                  if (!userInfo[key]) {
                    isFalse = true;
                  }
                }
                if (!isFalse) {
                  $state.go('presentations');
                } else {
                  $state.go('optionallyFields');
                }
              } else {
                $state.go('presentations');
              }
            }
           ).catch(function (error) {
             currentUserService.checkStatus(error);
           });
           return data;
         }).catch(function (error) {
           currentUserService.checkStatus(error);
         });
       });
     }
     this.googleLogin = function () {
       gapi.load('client:auth2', initAuth);
     };
   }
 ]);
