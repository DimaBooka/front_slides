'use strict';

// Declare app level module which depends on views, and components
angular.module('SlidesApp', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'authService',
  'presentationService',
  'eventService',
  'commentService',
  'facebookService',
  'googleService'
])
  .config(['$locationProvider', '$httpProvider', '$resourceProvider', '$stateProvider',
    function($locationProvider, $httpProvider, $resourceProvider, $stateProvider) {
      $locationProvider.hashPrefix('!');
      $httpProvider.defaults.withCredentials = true;
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      $resourceProvider.defaults.stripTrailingSlashes = false;

      $stateProvider.state(
        {
          name: 'presentations',
          url: '/presentations/',
          component: 'presentationList',
          params: {
            "published": true,
          }
        })
      .state({
          name: 'myPresentations',
          url: '/my-presentations/',
          component: 'presentationList',
          params: {
            "my": true,
          }
        })
      .state(
        {
          name: 'events',
          url: '/events/',
          component: 'eventList',
        })
      .state(
        {
          name: 'event-detail',
          url: '/events/{id}',
          component: 'eventDetail',
        })
      .state(
        {
          name: 'presentation-detail',
          url: '/presentation/{id}',
          component: 'presentationDetail',
        })
      .state(
        {
          name: 'login',
          url: '/login/',
          component: 'loginPage',
        })
      .state(
        {
          name: 'logout',
          url: '/logout/',
          component: 'logoutPage',
        })
      .state(
        {
          name: 'restore',
          url: '/restore/',
          component: 'restorePassword',
        })
      .state(
        {
          name: 'registration',
          url: '/registration/',
          component: 'registrationPage',
        })
      .state(
        {
          name: 'profile',
          url: '/profile/',
          component: 'profilePage',
        })
      .state(
        {
          name: 'addPresentation',
          url: '/add_presentation/',
          component: 'addPresentation',
        })
      .state(
        {
          name: 'changePassword',
          url: '/change_password/',
          component: 'changePassword',
        });
    }]).run(function ($rootScope, currentUserService) {
      currentUserService.loadTokenFromLS();
      currentUserService.loadUserFromLS();
    });
