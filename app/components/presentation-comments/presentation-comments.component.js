angular.
  module('SlidesApp').
  component('presentationComments', {
    templateUrl: 'components/presentation-comments/presentation-comments.template.html',
    bindings: {
      id: '@'
    },
    controller: ['Comments', 'currentUserService', '$scope', '$stateParams', '$rootScope', 'pageSize',
      function (Comments,  currentUserService, $scope, $stateParams, $rootScope, pageSize) {
        if ($rootScope.user) {
          $scope.currentUserId = $rootScope.user.id;
        }
        $scope.comments = true;
        $scope.presentationId = this.id;
        if (!this.id) {
          $scope.presentationId = $stateParams.id;
        }
        var page = parseInt($stateParams.page);
        $scope.getComments = function (page) {
          Comments.forPresentation({page: page, presentation_id: $scope.presentationId}).$promise
            .then(
              function (response) {
                $scope.comments = response.results;
                if (!$scope.comments.length) {
                  $scope.comments = false;
                }
                $scope.pages = Array.apply(null, Array(Math.ceil(response.count / pageSize))).map(function (_, i) {return i + 1;});
                $scope.cur_page = page || 1;
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
