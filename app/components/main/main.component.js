angular.
  module('SlidesApp').
  component('mainPage', {
    templateUrl: 'components/main/main.template.html',
    controller: ['$state', '$scope',
      function ($state, $scope) {
        $scope.showGuide = true;
      }
    ]
  });
