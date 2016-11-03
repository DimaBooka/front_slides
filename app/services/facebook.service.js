/**
 * Created by user on 27.10.16.
 */
angular.module('facebookService', [])
 .service('FacebookAuth', ['$rootScope','$window', 'Auth', 'currentUserService', '$state', 'facebookAppId',
   function($rootScope, $window, Auth, currentUserService, $state, facebookAppId) {
     $rootScope.facebookUser = {};

     this.fbInit = function() {
       FB.init({
         appId      : facebookAppId,
         xfbml      : true,
         version    : 'v2.8'
       });
     };

     this.statusChangeCallback = function (response) {
       var _self = this;
       if (response.authResponse){
         Auth.facebookLogin({}, {
           'access_token': response.authResponse.accessToken
         }).$promise.then(function (data) {
           currentUserService.setToken(data.key);
           currentUserService.loadUserFromAPI();
           _self.getUserInfo();
           $state.go('presentations');
           return data;
         }).catch(function (error) {
            self.error = true;
            self.errors = [];
            for (var key in error['data']){
              self.errors.push(error['data'][key][0]);
            }
          });
       } else {
         FB.login(function(response) {
           if (response.authResponse) {
             FB.getLoginStatus(function(response) {
              _self.statusChangeCallback(response);
             });
           }
         });
       }
     };

     this.getUserInfo = function() {
       var _self = this;
       FB.api('/me', function(res) {
         $rootScope.$apply(function() {
           $rootScope.facebookUser = _self.facebookUser = res;
         });
       });
     };

     this.watchLoginChange = function(){
       var _self = this;
       FB.Event.subscribe('auth.authResponseChange', function(res) {
         if (res.status === 'connected') {
           _self.getUserInfo();
         }
       });
       FB.getLoginStatus(function(response) {
        _self.statusChangeCallback(response);
       });
     };
   }
 ]);
