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
    .service('fileUpdate', ['$http', '$route', function ($http, $route) {
      this.updateToUrl = function(thumbnail, name, isPublic, description, uploadUrl){
        var fd = new FormData();
        if (typeof thumbnail != "string") {
          fd.append('thumbnail', thumbnail);
        }
        fd.append('name', name);
        fd.append('description', description);
        fd.append('published', isPublic);
        $http.patch(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
        .success(function(){
          $route.reload();
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
    }])
    .controller('UpdatePresentation', ['$scope', 'fileUpdate', 'baseUrl', function($scope, fileUpdate, baseUrl){
      $scope.updated = false;
      $scope.redactor = function(){
        var thumbnail = $scope.thumbnail;
        var name =$scope.name;
        var description = $scope.description;
        var isPublic = !!$scope.isPublic;
        console.log('update');
        var uploadUrl = baseUrl + "/api/presentations/" + $scope.presentationId + "/";
        fileUpdate.updateToUrl(thumbnail, name, isPublic, description, uploadUrl);
        $scope.updated = true;
      };
    }]);