(function(){
  'use strict';
  homeAppService.factory('HomeDetailService', ['DatabaseConfig', function(DatabaseConfig) {
    // Might use a resource here that returns a JSON array
    DatabaseConfig.dataBaseInitialized();
    var homeDetail = {};
    var roomRef = firebase.database().ref();
    return {
      getRoomDetail: function(id, roomId){
        return roomRef.child('room').child(id).child(roomId).once('value').then(function(snapshot) {
          return snapshot.val();
        });
      },
      getDomain: function (id, roomId) {
        return roomRef.child('room').child(id).child(roomId).once('value').then(function(snapshot){
          return snapshot.val();
        });
      },
      setStatusOn: function(id, roomId, device){
        return roomRef.child('room').child(id).child(roomId).child('gpio').child(device).update({'status': 1}).then(function(data){
          console.log('switch on');
        });
      },
      setStatusOff: function(id, roomId, device){
        return roomRef.child('room').child(id).child(roomId).child('gpio').child(device).update({'status': 0}).then(function(data){
          console.log('switch off');
        });
      }
    };
  }]);
})();
