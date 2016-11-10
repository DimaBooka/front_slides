'use strict';

// Declare app level module which depends on views, and components
angular.module('SlidesApp', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'ui.bootstrap.datetimepicker',
  'ngWebSocket',
  'authService',
  'presentationService',
  'setEmailService',
  'eventService',
  'socketService',
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
      // $httpProvider.defaults.headers. = 'X-CSRFToken';
      $resourceProvider.defaults.stripTrailingSlashes = false;

      $stateProvider.state(
        {
          name: 'presentations',
          url: '/presentations/?page',
          component: 'presentationList',
          params: {
            published: true,
            page: {
              value: '1',
              squash: true
            },
          }

        })
      .state({
          name: 'myPresentations',
          url: '/my-presentations/?page',
          component: 'presentationList',
          params: {
            my: true,
            page: {
              value: '1',
              squash: true
            },
          }
        })
      .state(
        {
          name: 'events',
          url: '/events/?page',
          component: 'eventList',
          params: {
            public: true,
            page: {
              value: '1',
              squash: true
            },
          }
        })
      .state(
        {
          name: 'myEvents',
          url: '/my-events/?page',
          component: 'eventList',
          params: {
            myEvents: true,
            page: {
              value: '1',
              squash: true
            },
          }
        })
      .state(
        {
          name: 'historyEvents',
          url: '/history/?page',
          component: 'eventList',
          params: {
            history: true,
            page: {
              value: '1',
              squash: true
            },
          }
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
          url: '/presentations/{id}',
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
        })
      .state(
        {
          name: 'confirmEmail',
          url: '/account-confirm-email/{key}/',
          component: 'confirmEmail',
        })
      .state(
        {
          name: 'passwordReset',
          url: '/reset/done/',
          component: 'passwordReset',
        })
      .state(
        {
          name: 'main',
          url: '/',
          component: 'mainPage',
        })
      .state(
        {
          name: 'notFound',
          url: '/404/',
          component: 'notFound',
        })
      .state(
        {
          name: 'setEmail',
          url: '/set-email/',
          component: 'setEmail',
        })
      .state(
        {
          name: 'validatePassword',
          url: '/validate-account/',
          component: 'validatePassword',
        });
    }]).run(function ($rootScope, currentUserService, $state) {
      if (!location.hash) {
        $state.go('presentations')
      }
      currentUserService.loadTokenFromLS();
      currentUserService.loadUserFromLS();
      $rootScope.profilePageClear = function() {
        $rootScope.change = false;
        $rootScope.successfuly = false;
      };
    });
