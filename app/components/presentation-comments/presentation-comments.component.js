angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    bindings: {
      id: '@'
    },
    controller: ['Comments',  'currentUserService', '$scope', '$stateParams', '$rootScope',
      function (Comments,  currentUserService, $scope, $stateParams, $rootScope) {
        if ($rootScope.user) {
          $scope.currentUserId = $rootScope.user.id;
        }

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
            ).catch(function (error) {
              currentUserService.checkStatus(error);
            });
        };
        $scope.getComments();
        $scope.addComment = function () {
          Comments.create({}, {
            text: this.text,
            presentation: $scope.presentationId,
            author: $scope.currentUserId
          }).$promise.then(
            function (response) {
             $scope.getComments();
            }
          ).catch(function (error) {
            currentUserService.checkStatus(error);
          });
          this.text = '';
        };
        $scope.deleteComment = function (id) {
          Comments.delete({id: id}).$promise.then(
            function (response) {
              $scope.getComments();
            }
          ).catch(function (error) {
            currentUserService.checkStatus(error);
          });
        };
      }
    ]
  });
