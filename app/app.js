'use strict';

// Declare app level module which depends on views, and components
angular.module('SlidesApp', [
  'ngRoute',
  'ngResource',
  'authService',
  'presentationService',
  'eventService',
  'commentService',
])
  .config(['$locationProvider', '$routeProvider', '$httpProvider', '$resourceProvider',
    function($locationProvider, $routeProvider, $httpProvider, $resourceProvider) {
      $locationProvider.hashPrefix('!');
      $httpProvider.defaults.withCredentials = true;
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      $resourceProvider.defaults.stripTrailingSlashes = false;

      $routeProvider.
        when('/', {
          template: '<main-page></main-page>'
        }).
        when('/events', {
          template: '<event-list></event-list>'
        }).
        when('/presentations', {
          template: '<presentation-list></presentation-list>'
        }).
        when('/presentations/:id', {
          template: '<presentation-detail></presentation-detail>'
        }).
        when('/events/:id', {
          template: '<event-detail></event-detail>'
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
    }]).run(function ($rootScope, $http) {
      if (localStorage['token']) {
        $http.defaults.headers.common['Authorization'] = 'Token ' + localStorage['token'];
        $rootScope.token = localStorage['token'];
      }
    });
