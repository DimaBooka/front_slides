angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    controller: ['Comments', '$scope', '$stateParams', '$state',
      function (Comments, $scope, $stateParams, $state) {
        var self = this;
        $scope.userAuth = !!localStorage['user'];
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
        }
      }
    ]
  });
