'use strict';

// Declare app level module which depends on views, and components
angular.module('SlidesApp', [
  'ngRoute',
  'AuthorizationService',
  'GetListPresentationServices'
])
  .config(['$locationProvider', '$routeProvider', '$httpProvider',
    function($locationProvider, $routeProvider, $httpProvider) {
      $locationProvider.hashPrefix('!');

      $httpProvider.defaults.withCredentials = true;
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

      $httpProvider.defaults.headers.common['Authorization'] = 'Token ' + localStorage['token']

      $routeProvider.
        when('/', {
          template: '<main-page></main-page>'
        }).
        when('/schedule', {
          template: '<schedule></schedule>'
        }).
        when('/presentations', {
          template: '<presentation-list></presentation-list>'
        }).
        when('/presentations/:linkPresentation', {
          template: '<presentation-detail></presentation-detail>'
        }).
        when('/onlive/:linkPresentation', {
          template: '<presentation-onlive></presentation-onlive>'
        }).
        when('/login', {
          template: '<login-page></login-page>'
        }).
        when('/restore', {
          template: '<restore-password></restore-password>'
        }).
        when('/logout', {
          template: '<logout-page></logout-page>'
        }).
        when('/registration', {
          template: '<registration-page></registration-page>'
        }).
        when('/profile', {
          template: '<profile-page></profile-page>'
        }).
        otherwise({redirectTo: '/'});
    }]);
