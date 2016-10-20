angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    controller: ['Comments', '$scope', '$routeParams', '$route',
      function (Comments, $scope, $routeParams, $route) {
        var self = this;
        $scope.userAuth = !!localStorage['user'];
        Comments.forPresentation({presentation_id: $routeParams.id}).$promise
        .then(
          function (response) {
            $scope.comments = response;
          }
        );
        $scope.addComment = function () {
          debugger;
          Comments.create({}, {
            text: this.text,
            presentation: $routeParams.id,
            author: JSON.parse(localStorage['user'])['id']
          }).$promise.then(function () {
            $route.reload();
          })
        }
      }
    ]
  });
