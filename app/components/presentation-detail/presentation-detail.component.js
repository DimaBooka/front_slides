angular.
  module('SlidesApp').
  component('presentationDetail', {
    templateUrl: 'components/presentation-detail/presentation-detail.template.html',
    controller: ['Presentation', 'fileUpdate', 'baseUrl','$scope', '$stateParams',
      function (Presentation, fileUpdate, baseUrl, $scope, $stateParams) {
        var self = this;
        self.updateAble = false;
        Presentation.get({'id': $stateParams.id}).$promise
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
      }
    ]
  });
