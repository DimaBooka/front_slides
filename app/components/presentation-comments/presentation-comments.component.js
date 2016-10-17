angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    controller: ['getPresentationComments', '$scope',
      function (getPresentationComments, $scope) {
        $scope.comments = getPresentationComments.query();
      }
    ]
  });
