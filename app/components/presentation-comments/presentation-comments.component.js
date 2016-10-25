angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    bindings: {
      id: '@'
    },
    controller: ['Comments', '$scope', '$stateParams',
      function (Comments, $scope, $stateParams) {
        $scope.userAuth = !!localStorage['user'];

        $scope.currentUserId = JSON.parse(localStorage['user']).id;

        $scope.presentationId = this.id;
        if (!this.id) {
          $scope.presentationId = $stateParams.id;
        }
        $scope.getComments = function () {
          Comments.forPresentation({presentation_id: $scope.presentationId}).$promise
            .then(
              function (response) {
                $scope.comments = response;
              }
            );
        };
        $scope.getComments();
        $scope.addComment = function () {
          Comments.create({}, {
            text: this.text,
            presentation: $scope.presentationId,
            author: JSON.parse(localStorage['user'])['id']
          }).$promise.then(
            function (response) {
             $scope.getComments();
            }
          );
          this.text = '';
        };
        $scope.deleteComment = function (id) {
          Comments.delete({id: id}).$promise.then(
            function (response) {
              $scope.getComments();
            }
          );
        };
      }
    ]
  });
