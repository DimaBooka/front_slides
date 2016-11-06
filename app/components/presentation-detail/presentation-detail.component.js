angular.
  module('SlidesApp').
  component('presentationDetail', {
    bindings: {
      id: '@'
    },
    templateUrl: 'components/presentation-detail/presentation-detail.template.html',

    controller: ['Presentation', 'fileUpdate', 'baseUrl','$scope', '$stateParams', '$state', '$rootScope', 'currentUserService',
      function (Presentation, fileUpdate, baseUrl, $scope, $stateParams, $state, $rootScope, currentUserService) {
        var self = this;
        self.updateAble = false;
        $scope.createTrue = false;
        $scope.updateTrue = false;
        $scope.presentationId = this.id;
        if (!this.id) {
          $scope.presentationId = $stateParams.id;
        }
        $scope.trueUpdate = function () {
          $scope.updateTrue = !$scope.updateTrue;
          $scope.createTrue = false;
        };
        $scope.trueCreate = function () {
          $scope.createTrue = !$scope.createTrue;
          $scope.updateTrue = false;
        };
        $scope.getPresentation = function () {
          Presentation.get({'id': $scope.presentationId}).$promise
          .then(
            function (response) {
              $scope.presentation = response;
              if ($rootScope.user) {
                var currentUserId = $rootScope.user.id;
                if (currentUserId == response['creator_info']['id']) {
                  $scope.presentationId = response['id'];
                  $scope.name = response['name'];
                  $scope.description = response['description'];
                  $scope.published = response['published'];
                self.updateAble = true;
                }
              }
            }
          ).catch(function (error) {
            currentUserService.checkStatus(error);
          });
        };
        $scope.getPresentation();
        $scope.redactor = function(){
          $scope.error = false;
          if (this.thumbnail) {
            if (this.thumbnail.size / 1024 / 1024 > 5) {
              $scope.error = 'The file is biggest then 5Mb.';
            }
          }
          if (!$scope.error) {
            if (this.name && this.description) {
              var thumbnail = this.thumbnail;
              var name = this.name;
              var description = this.description;
              var isPublic = !!this.published;
              var uploadUrl = baseUrl + "/api/presentations/" + $scope.presentationId + "/";
              fileUpdate.updateToUrl(thumbnail, name, isPublic, description, uploadUrl, $scope.getPresentation);
              $scope.updateTrue = false;
            } else {
              $scope.error = 'Name or description consist of spaces only.';
            }
          }
        };
        $scope.deletePr = function () {
          Presentation.delete({id:$scope.presentationId}).$promise.then(
            function () {
               $state.go('presentations');
            }
          ).catch(function (error) {
            currentUserService.checkStatus(error);
          });
        };
      }
    ]
  });
