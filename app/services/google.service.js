/**
 * Created by user on 28.10.16.
 */
angular.module('googleService', [])
 .service('GoogleAuth', [ '$state', 'Auth', 'currentUserService',
   function($state, Auth, currentUserService) {
     this.googleLogin = function () {

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
             return data;
           });
           $state.go('presentations');
         });
       }
       gapi.load('client:auth2', initAuth);
     }
   }
 ]);