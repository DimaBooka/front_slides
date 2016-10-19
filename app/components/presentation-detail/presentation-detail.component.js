angular.
  module('SlidesApp').
  component('presentationDetail', {
    templateUrl: 'components/presentation-detail/presentation-detail.template.html',
    controller: ['Presentation', 'fileUpdate', 'baseUrl','$scope', '$routeParams',
      function (Presentation, fileUpdate, baseUrl, $scope, $routeParams) {
        var self = this;
        self.updateAble = false;
        Presentation.get({'id': $routeParams.id}).$promise
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
