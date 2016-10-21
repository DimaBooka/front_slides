angular.
  module('SlidesApp').
  component('profilePage', {
    templateUrl: 'components/profile-page/profile-page.template.html',
    controller: ['Presentation', 'Auth','fileUpdate', 'baseUrl','$scope', '$state',
      function (Presentation, Auth, fileUpdate, baseUrl, $scope, $state) {
        var userID = JSON.parse(localStorage['user']).id;
        $scope.profileMenu = JSON.parse(localStorage['profileMenu']);

        $scope.infoUser = function () {
          localStorage['profileMenu'] = JSON.stringify([true, false, false]);
          $scope.profileMenu = [true, false, false];
          $scope.userInfo = JSON.parse(localStorage['user']);
        };
        $scope.myPr = function () {
          localStorage['profileMenu'] = JSON.stringify([false, true, false]);
          $scope.profileMenu = [false, true, false];
          Presentation.query({creator_id:userID}).$promise
              .then( function (response) {
                $scope.presentations = response;
          })
        };
        $scope.addPr = function () {
          localStorage['profileMenu'] = JSON.stringify([false, false, true]);
          $scope.profileMenu = [false, false, true];
        };
        $scope.deletePr = function (idPresentation) {
          Presentation.delete({id:idPresentation}).$promise.then(
            function () {
               $state.reload();
            }
          )
        };
      }
    ]
  });
