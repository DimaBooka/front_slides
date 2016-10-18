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
      this.uploadFileToUrl = function(slides, thumbnail, name, isPrivate, description, uploadUrl){
        var fd = new FormData();
        fd.append('slides', slides);
        fd.append('thumbnail', thumbnail);
        fd.append('name', name);
        fd.append('description', description);
        fd.append('isPrivate', isPrivate);
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
    .controller('NewPresentation', ['$scope', 'fileUpload', function($scope, fileUpload){
      $scope.uploadFile = function(){
        var slides = $scope.slides;
        var thumbnail = $scope.thumbnail;
        var name =$scope.name;
        var description = $scope.description;
        var isPrivate = $scope.isPrivate;
        console.log('upload');
        var uploadUrl = "http://127.0.0.1:7700/api/presentations/";
        fileUpload.uploadFileToUrl(slides, thumbnail, name, isPrivate, description, uploadUrl);
      };
    }]);