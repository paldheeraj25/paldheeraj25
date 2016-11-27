(function(){
'use strict';
  homeAppController.controller('HomeDetailController', function($http, $state, $stateParams, $rootScope, $scope,  $ionicModal, auth, roomId, roomDetail, HomeDetailService) {
  var _instance = this;
  _instance.userId = auth;
  _instance.roomId = roomId;
  if(auth === null){
    $state.go('login');
  }
  $rootScope.onDevices = [];
  _instance.roomDetail = roomDetail;
  _instance.devices = [];
  _instance.getAllDevice = angular.copy(_instance.roomDetail.gpio);
  $ionicModal.fromTemplateUrl('my-modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.setOnTimer = function(onTime, room, device){
    console.log(onTime + ' ' + room  + ' ' + device);
  };

  $scope.setOffTimer = function(offTime, room, device){
    console.log(offTime + ' ' + room  + ' ' + device);
  };
  console.log(_instance.roomDetail);
  console.log(_instance.userId);
  _.each(_instance.roomDetail.gpio, function(device){
    _instance.devices[device.value] = Boolean(device.status);
  });

  _instance.addTimer = function(value, name, deviceValue){
    $scope.modalDeviceValue = value;
    $scope.modalDeviceName = name;
    $scope.modalDeviceDataValue = deviceValue;
    $scope.roomId = $stateParams.roomId;
    $scope.modal.show();
  };

  _instance.allDeviceToggle = function(value){
    console.log(value);
    console.log(_instance.getAllDevice);
    var getAllDevice = _.pluck(_instance.getAllDevice, "localUrl");
    console.log(getAllDevice);
    _.each(getAllDevice, function(device){
       $http.jsonp('https://'+ roomDetail.domain + '/gpio2.php?device='+device +'&state='+value+'&callback=JSON_CALLBACK').success(function(data){
        console.log(value +' is '+value);
        HomeDetailService.setStatusOn(_instance.userId, $stateParams.roomId, 'cfl');
      })
      .error(function (error) {
        console.log('failure');
      });
    });
  };

  _instance.toggleSwitch = function(deviceValue, device){
    console.log(deviceValue);
    console.log(device);
    // new code irrespective of device
    $http.jsonp('https://'+ roomDetail.domain + '/gpio2.php?device='+device.localUrl +'&state='+deviceValue+'&callback=JSON_CALLBACK').success(function(data){
      console.log('success');
      HomeDetailService.setStatusOn(_instance.userId, $stateParams.roomId, 'cfl');
    })
    .error(function (error) {
      console.log('error');
    });
  };
});
}());