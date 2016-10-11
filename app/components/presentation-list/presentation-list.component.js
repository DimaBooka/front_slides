angular.
  module('SlidesApp').
  component('presentationList', {
    templateUrl: 'components/presentation-list/presentation-list.template.html',
    controller: [
      function presentationsController() {
        this.presentatoins = [
          {
            name: 'Google Presentation',
            description: 'super google presentation',
            slides: '??? path to file ???',
            thumbnail: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTH-NrSsH7a9U5kWj5OoThwfkomahlOETQ3e0TqKU9kKRSGAWPj',
            creator: 'mark Dublis',
            date_created: '2016-10-11',
            published: false
          },{
            name: 'Yandex Presentation',
            description: 'super yandex presentation',
            slides: '??? path to file ???',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/en/6/64/Google_Reader_logo.png',
            creator: 'mark Dublis',
            date_created: '2016-10-11',
            published: false
          }
        ];
      }
    ]
  });