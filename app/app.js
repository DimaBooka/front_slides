'use strict';

// Declare app level module which depends on views, and components
angular.module('SlidesApp', [
  'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.
    when('/main', {
      template: '<main></main>'
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
    when('/logout', {
      template: '<logout-page></logout-page>'
    }).
    when('/registration', {
      template: '<registration-page></registration-page>'
    }).
    otherwise({redirectTo: '/'});
}]);
