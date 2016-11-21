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
      this.uploadFileToUrl = function(slides, thumbnail, name, isPublic, description, uploadUrl, scope){
        var fd = new FormData();
        fd.append('slides', slides);
        fd.append('thumbnail', thumbnail);
        fd.append('name', name);
        fd.append('description', description);
        fd.append('published', isPublic);
        return $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        });
      }
    }])
    .service('fileUpdate', ['$http', function ($http) {
      this.updateToUrl = function(slides, thumbnail, name, isPublic, description, uploadUrl, reload){
        var fd = new FormData();
        if (slides) {
          fd.append('slides', slides);
        }
        if (thumbnail) {
          fd.append('thumbnail', thumbnail);
        }
        fd.append('name', name);
        fd.append('description', description);
        fd.append('published', isPublic);
        return $http.patch(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        });
      }
    }]);
