/**
 * Created by user on 12.10.16.
 */
angular.
  module('SlidesApp')
    .directive('fileModel', ['$parse', function ($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          element.bind('change', function(){
            scope.$apply(function(){
               modelSetter(scope, element[0].files[0]);
            });
          });
        }
      };
    }])
    .service('fileUpload', ['$http', function ($http) {
      this.uploadFileToUrl = function(slides, thumbnail, name, isPublic, description, uploadUrl){
        var fd = new FormData();
        fd.append('slides', slides);
        fd.append('thumbnail', thumbnail);
        fd.append('name', name);
        fd.append('description', description);
        fd.append('published', isPublic);
        $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
      }
    }])
    .controller('NewPresentation', ['$scope', 'fileUpload', 'baseUrl', function($scope, fileUpload, baseUrl){
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
    }]);
