angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    controller: ['Comment', '$scope', '$routeParams',
      function (Comment, $scope, $routeParams) {
        Comment.forPresentation({presentation_id: $routeParams.id}).$promise
        .then(
          function (response) {
            $scope.comments = response;
          }
        );
      }
    ]
  });
