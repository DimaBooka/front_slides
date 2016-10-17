/**
 * Created by user on 12.10.16.
 */
angular.
  module('SlidesApp')
    .controller('NewPresentation',
      function NewPresentationCtrl($scope, UploadService, AuthorizService) {
        $scope.createNewPresentation = function () {
          UploadService.save({}, {
              name: $scope.name,
              description: $scope.description,
              slides: $scope.slides,
              thumbnail: $scope.thumbnail,
              published: $scope.published
          });
        };
      }
    );
