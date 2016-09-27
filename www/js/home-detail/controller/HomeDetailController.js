'use strict';
homeAppController.controller('HomeDetailController', function($scope, roomId, auth, HomeService, DatabaseConfig, HomeDetailService) {
  var _instance = this;
  _instance.roomId = roomId;
  DatabaseConfig.dataBaseInitialized();
  _instance.user = auth;
  HomeDetailService.getRoomDetail(_instance.user, _instance.roomId).then(function(data){
    _instance.roomDetail = data;
  });
});