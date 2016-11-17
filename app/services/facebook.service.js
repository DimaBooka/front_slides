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
            $rootScope.facebookErrors = error['data'].detail;
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
