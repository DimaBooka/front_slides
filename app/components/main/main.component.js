angular.
  module('SlidesApp').
  component('mainPage', {
    templateUrl: 'components/main/main.template.html',
    controller: ['$state', '$scope',
      function ($state, $scope) {
        $scope.showGuide = false;
        $scope.toggle = function () {
          $scope.showGuide = !$scope.showGuide;
        };
      }
    ]
  });
