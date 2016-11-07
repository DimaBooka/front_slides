/**
 * Created by user on 07.11.16.
 */
angular.
  module('SlidesApp').
  component('notFound', {
    templateUrl: 'components/not-found/notFound.html',
    controller: [ '$timeout', '$scope',
      function ($timeout, $scope) {
        $scope.showGif = true;
        $scope.changeStatus = function () {
          $timeout(
            function () {
              $scope.showGif = false;
              $scope.$applyAsync();
          }, 4800, false);
        };
      }
    ]
  });