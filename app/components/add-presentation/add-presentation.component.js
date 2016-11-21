/**
 * Created by user on 21.10.16.
 */
angular.
  module('SlidesApp').
  component('addPresentation', {
    templateUrl: 'components/add-presentation/add-presentation.template.html',
    controller: ['$scope', 'fileUpload', 'baseUrl', '$rootScope', '$state', 'currentUserService',
      function ($scope, fileUpload, baseUrl, $rootScope, $state, currentUserService) {
        if (!$rootScope.user){
          $state.go('login');
        }
        var self = this;
        this.fileOrLink = false;
        $scope.uploaded = false;
        $scope.error = false;
        $scope.uploadFile = function(){
          $scope.error = false;
          if (this.thumbnail) {
            if (this.thumbnail.size / 1024 / 1024 > 5) {
              $scope.error = 'The thumbnail picture is biggest than 5Mb.';
            } else if (this.thumbnail.size < 1) {
              $scope.error = 'The thumbnail picture is empty.';
            }
          }


          if (self.link || self.file) {
            if (self.fileOrLink == 1 && self.link) {
               this.slides = self.link;
            } else if (self.fileOrLink == 1) {
              $scope.error = "Link didn't select"
            }

            if (self.fileOrLink == 2 && self.file) {
               this.slides = self.file;
            } else if (self.fileOrLink == 2) {
              $scope.error = "File didn't select"
            }
          } else {
            debugger;
            $scope.error = "File or link didn't select";
          }


          if (!$scope.error){
            if (this.thumbnail && this.name && this.description) {
              var slides = this.slides;
              var thumbnail = this.thumbnail;
              var name = this.name;
              var description = this.description;
              var isPublic = !!this.isPublic;
              var uploadUrl = baseUrl + "/api/presentations/";
              fileUpload.uploadFileToUrl(slides, thumbnail, name, isPublic, description, uploadUrl, $scope.error)
                  .success(function(){
                    $scope.uploaded = true;
                  })
                  .error(function(error){
                    currentUserService.checkStatus(error);
                    for (var key in error) {
                      $scope.error = error[key][0];
                      if ($scope.error.length == 1) {
                        $scope.error = error[key];
                      }
                    }
                  });
            }else {
              $scope.error = 'Name or description consist of spaces only.';
            }
          }
        };
        $scope.uploadedSuccess = function () {
          $scope.uploaded = false;
          self.link = '';
          self.file = '';
        }
      }
    ]
  });
