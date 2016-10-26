angular.
  module('SlidesApp').
  component('presentationDetail', {
    bindings: {
      id: '@'
    },
    templateUrl: 'components/presentation-detail/presentation-detail.template.html',

    controller: ['Presentation', 'fileUpdate', 'baseUrl','$scope', '$stateParams', '$state',
      function (Presentation, fileUpdate, baseUrl, $scope, $stateParams, $state) {
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
              if (!!localStorage['user']) {
                var currentUserId = JSON.parse(localStorage['user']).id;
                if (currentUserId == response['creator_info']['id']) {
                  $scope.presentationId = response['id'];
                  $scope.name = response['name'];
                  $scope.description = response['description'];
                self.updateAble = true;
                }
              }
            }
          );
        };
        $scope.getPresentation();
        $scope.redactor = function(){
          var thumbnail = this.presentation.thumbnail;
          var name =this.presentation.name;
          var description = this.presentation.description;
          var isPublic = !!this.presentation.published;
          var uploadUrl = baseUrl + "/api/presentations/" + $scope.presentationId + "/";
          fileUpdate.updateToUrl(thumbnail, name, isPublic, description, uploadUrl, $scope.getPresentation);
          $scope.updateTrue = false;
        };
        $scope.deletePr = function () {
          Presentation.delete({id:$scope.presentationId}).$promise.then(
            function () {
               $state.go('presentations');
            }
          )
        };

      }
    ]
  });
