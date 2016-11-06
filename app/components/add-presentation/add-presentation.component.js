/**
 * Created by user on 21.10.16.
 */
angular.
  module('SlidesApp').
  component('addPresentation', {
    templateUrl: 'components/add-presentation/add-presentation.template.html',
    controller: ['$scope', 'fileUpload', 'baseUrl', '$rootScope', '$state',
      function ($scope, fileUpload, baseUrl, $rootScope, $state) {
        if (!$rootScope.user){
          $state.go('login');
        }
        $scope.uploaded = false;
        $scope.error = false;
        $scope.uploadFile = function(){
          if ($scope.thumbnail.size/1024/1024 < 5){
            if ($scope.name && $scope.description) {
              var slides = $scope.slides;
              var thumbnail = $scope.thumbnail;
              var name = $scope.name;
              var description = $scope.description;
              var isPublic = !!$scope.isPublic;
              console.log('upload');
              var uploadUrl = baseUrl + "/api/presentations/";
              fileUpload.uploadFileToUrl(slides, thumbnail, name, isPublic, description, uploadUrl, $scope.error);
              $scope.uploaded = true;
            }else {
              $scope.error = 'Name or description consist of spaces only.';
            }
          } else {
            $scope.error = 'The file is biggest then 5Mb.';
          }
        };
        $scope.uploadedSuccess = function () {
          $scope.uploaded = false;
        }
      }
    ]
  });
