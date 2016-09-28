'use strict';
homeAppController.controller('HomeDetailController', function(roomId, roomDetail) {
  var _instance = this;
  _instance.roomId = roomId;
  console.log(roomDetail);
  _instance.roomDetail = roomDetail;
  _instance.toggleSwitch = function(deviceValue, deviceName){
    console.log(deviceValue + ' ' +deviceName);
  };
});