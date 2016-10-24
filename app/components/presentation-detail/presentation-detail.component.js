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
        $scope.presentationId = this.id;
        if (!this.id) {
          $scope.presentationId = $stateParams.id;
        }
        queryStr = Presentation.get({'id': $scope.presentationId});

        queryStr.$promise
        .then(
          function (response) {
            $scope.presentation = response;
            if (!!localStorage['user']) {
              var currentUserId = JSON.parse(localStorage['user']).id;
              if (currentUserId == response['creator_info']['id']) {
                $scope.presentationId = response['id'];
                $scope.thumbnail = response['thumbnail'];
                $scope.name = response['name'];
                $scope.description = response['description'];
                $scope.isPublic = response['published'];

                self.updateAble = true;
              }
            }
          }
        );
        $scope.redactor = function(){
          var thumbnail = this.thumbnail;
          var name =this.name;
          var description = this.description;
          var isPublic = !!this.isPublic;
          var uploadUrl = baseUrl + "/api/presentations/" + $scope.presentationId + "/";
          fileUpdate.updateToUrl(thumbnail, name, isPublic, description, uploadUrl);
          $scope.updated = true;
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
