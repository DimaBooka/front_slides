angular.
  module('SlidesApp').
  component('mainPage', {
    templateUrl: 'components/main/main.template.html',
    controller: ['$state', '$scope',
      function ($state, $scope) {
        $scope.showGuide = false;
        $scope.toggle = function () {
          $scope.showGuide = !$scope.showGuide;
          $(function () {
            if ($scope.showGuide) {
              $(".quickguide").slideDown(1500);
            } else {
              $(".showGuide").slideUp(1000);
            }
          })
        };
      }
    ]
  });
