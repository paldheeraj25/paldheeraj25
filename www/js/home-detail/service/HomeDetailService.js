'use strict';
homeAppService.factory('HomeDetailService', function(DatabaseConfig) {
  // Might use a resource here that returns a JSON array
  DatabaseConfig.dataBaseInitialized();
  var homeDetail = {};
  var roomRef = firebase.database().ref();
  return {
    getRoomDetail: function(id, roomId){
      return roomRef.child('room').child(id).child(roomId).once('value').then(function(snapshot) {
        return snapshot.val();
      });
    }
  };
});
