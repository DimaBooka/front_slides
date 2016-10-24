angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    controller: ['Comments', '$scope', '$stateParams', '$state',
      function (Comments, $scope, $stateParams, $state) {
        $scope.userAuth = !!localStorage['user'];
        $scope.currentUserId = JSON.parse(localStorage['user']).id;
        Comments.forPresentation({presentation_id: $stateParams.id}).$promise
        .then(
          function (response) {
            $scope.comments = response;
          }
        );
        $scope.addComment = function () {
          Comments.create({}, {
            text: this.text,
            presentation: $stateParams.id,
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
