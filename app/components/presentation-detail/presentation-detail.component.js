angular.
  module('SlidesApp').
  component('presentationDetail', {
    bindings: {
      id: '@'
    },
    templateUrl: 'components/presentation-detail/presentation-detail.template.html',

    controller: ['Presentation', 'fileUpdate', 'baseUrl','$scope', '$stateParams', '$state', '$rootScope',
      function (Presentation, fileUpdate, baseUrl, $scope, $stateParams, $state, $rootScope) {
        var self = this;
        self.updateAble = false;
        $scope.createTrue = false;
        $scope.updateTrue = false;
        $scope.presentationId = this.id;
        console.log($scope);
        if (!this.id) {
          $scope.presentationId = $stateParams.id;
        }
        $scope.trueUpdate = function () {
          $scope.updateTrue = !$scope.updateTrue;
          $scope.createTrue = false;
          console.log($scope.createTrue);
        };
        $scope.trueCreate = function () {
          $scope.createTrue = !$scope.createTrue;
          $scope.updateTrue = false;
          console.log($scope.trueCreate);
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
