angular.
  module('SlidesApp').
  component('profilePage', {
    templateUrl: 'components/profile-page/profile-page.template.html',
    controller: [ 'UploadService', 'ResetPasswordService',
      function (UploadService, ResetPasswordService) {
        var self = this;
        this.addPresentation = function () {
          UploadService.save({}, {
            name: self.name,
            description: self.description,
            slides: self.slides,
            thumbnail: self.thumbnail,
            published: self.published
          });
        };
        this.resetPassword = function () {
          ResetPasswordService.save({},{
            new_password1: self.new_password1,
            new_password2: self.new_password2,
            old_password: self.old_password
          });
        };
      }
    ]
  });