angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    bindings: {
      id: '@'
    },
    controller: ['Comments', '$scope', '$stateParams', '$state',
      function (Comments, $scope, $stateParams, $state) {
        $scope.userAuth = !!localStorage['user'];

        $scope.currentUserId = JSON.parse(localStorage['user']).id;

        $scope.presentationId = this.id;
        if (!this.id) {
          $scope.presentationId = $stateParams.id;
        }
        queryStr = Comments.forPresentation({presentation_id: $scope.presentationId});

        queryStr.$promise
        .then(
          function (response) {
            $scope.comments = response;
          }
        );
        $scope.addComment = function () {
          Comments.create({}, {
            text: this.text,
            presentation: $scope.presentationId,
            author: JSON.parse(localStorage['user'])['id']
          }).$promise.then(function () {
            $state.reload();
          })
        };
        $scope.deleteComment = function (id) {
          Comments.delete({id: id}).$promise.then(
            function () {
              $state.reload();
            }
          );
        }
      }
    ]
  });
