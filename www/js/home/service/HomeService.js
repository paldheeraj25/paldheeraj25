(function(){
  'use strict';
  homeAppService.factory('HomeService',['DatabaseConfig', function(DatabaseConfig) {
    // Might use a resource here that returns a JSON array
    DatabaseConfig.dataBaseInitialized();

    var _instance = this;
    //Some fake testing data
    var rooms = [{
      id: 0,
      name: 'Hall',
      lastText: '',
      face: 'img/home.jpg'
    }, {
      id: 1,
      name: 'Kitchen',
      lastText: '',
      face: 'img/home.jpg'
    }, {
      id: 2,
      name: 'Bedroom 1',
      lastText: '',
      face: 'img/home.jpg'
    }, {
      id: 3,
      name: 'Bedroom 2',
      lastText: '',
      face: 'img/home.jpg'
    }, {
      id: 4,
      name: 'Balcony',
      lastText: '',
      face: 'img/home.jpg'
    }];
    return {
      all: function() {
        return rooms;
      },
      remove: function(room) {
        rooms.splice(rooms.indexOf(room), 1);
      },
      get: function(roomId) {
        for (var i = 0; i < rooms.length; i++) {
          if (rooms[i].id === parseInt(roomId)) {
            return rooms[i];
          }
        }
        return null;
      }
    };
  }]);
})();
