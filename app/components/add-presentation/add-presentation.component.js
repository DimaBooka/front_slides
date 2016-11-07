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
          $scope.error = false;
          if (this.thumbnail) {
            if (this.thumbnail.size / 1024 / 1024 > 5) {
              $scope.error = 'The thumbnail picture is biggest then 5Mb.';
            } else if (this.thumbnail.size < 1) {
              $scope.error = 'The thumbnail picture is empty.';
            }
          }
          if (this.slides) {
            if (this.slides.size / 1024 / 1024 > 2) {
              $scope.error = 'The markdown file is biggest then 2Mb.';
            } else if (this.slides.size < 1) {
              $scope.error = 'The markdown file is empty.';
            }
          }
          if (!$scope.error){
            if (this.slides && this.thumbnail && this.name && this.description) {
              var slides = this.slides;
              var thumbnail = this.thumbnail;
              var name = this.name;
              var description = this.description;
              var isPublic = !!this.isPublic;
              var uploadUrl = baseUrl + "/api/presentations/";
              fileUpload.uploadFileToUrl(slides, thumbnail, name, isPublic, description, uploadUrl, $scope.error);
              $scope.uploaded = true;
            }else {
              $scope.error = 'Name or description consist of spaces only.';
            }
          }
        };
        $scope.uploadedSuccess = function () {
          $scope.uploaded = false;
        }
      }
    ]
  });
