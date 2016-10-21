/**
 * Created by user on 21.10.16.
 */
angular.
  module('SlidesApp').
  component('addPresentation', {
    templateUrl: 'components/add-presentation/add-presentation.template.html',
    controller: ['$scope', 'fileUpload', 'baseUrl',
      function ($scope, fileUpload, baseUrl) {
        $scope.uploaded = false;
        $scope.uploadFile = function(){
          var slides = $scope.slides;
          var thumbnail = $scope.thumbnail;
          var name =$scope.name;
          var description = $scope.description;
          var isPublic = !!$scope.isPublic;
          console.log('upload');
          var uploadUrl = baseUrl + "/api/presentations/";
          fileUpload.uploadFileToUrl(slides, thumbnail, name, isPublic, description, uploadUrl);
          $scope.uploaded = true;
        };
        $scope.uploadedSuccess = function () {
          $scope.uploaded = false;
        }
      }
    ]
  });
