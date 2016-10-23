'use strict';
homeAppController.controller('HomeDetailController', function($http, $state, $stateParams, $rootScope, auth, roomId, roomDetail, HomeDetailService ) {
  var _instance = this;
  _instance.userId = auth;
  _instance.roomId = roomId;
  if(auth === null){
    $state.go('login');
  }
  $rootScope.onDevices = [];
  _instance.roomDetail = roomDetail;
  console.log(_instance.roomDetail);
  console.log(_instance.userId);
  _instance.toggleSwitch = function(deviceValue, deviceName){
    if(deviceName === 'CFL' && deviceValue === true){
      var onDevice = {};
      onDevice.deviceName = deviceName;
      onDevice.deviceValue = deviceValue;
      $rootScope.onDevices.push(onDevice);
      console.log($rootScope.onDevices);
      $http.jsonp('https://'+ roomDetail.domain + '/gpio2.php?cflon=OFF&callback=JSON_CALLBACK').success(function(data){
        console.log('success');
        console.log(data);
      })
      .error(function (error) {
        console.log('error');
      });
    } else if(deviceName === 'CFL' && deviceValue === false){
      console.log(_.findWhere($rootScope.onDevices,{deviceName: 'CFL'}));
      $rootScope.onDevices.splice(_.indexOf($rootScope.onDevices, _.findWhere($rootScope.onDevices,{deviceName: 'CFL'})));
      console.log($rootScope.onDevices);
      $http.jsonp('https://'+ roomDetail.domain + '/gpio2.php?cfloff=ON&callback=JSON_CALLBACK').success(function(data){
       console.log('success');
      })
      .error(function () {
        console.log('error');
      });
    } else if(deviceName === 'Tube Light' && deviceValue === true){
      var onDevice = {};
      onDevice.deviceName = deviceName;
      onDevice.deviceValue = deviceValue;
      $rootScope.onDevices.push(onDevice);
      $http.jsonp('https://'+ roomDetail.domain + '/gpio2.php?tubelighton=ON&callback=JSON_CALLBACK').success(function(data){
       console.log('success');
      })
      .error(function () {
        console.log('error');
      });
    } else if(deviceName === 'Tube Light' && deviceValue === false){
      $rootScope.onDevices.splice(_.indexOf($rootScope.onDevices, _.findWhere($rootScope.onDevices,{deviceName: 'Tube Light'})));
      $http.jsonp('https://'+ roomDetail.domain + '/gpio2.php?tubelightoff=ON&callback=JSON_CALLBACK').success(function(data){
       console.log('success');
      })
      .error(function () {
        console.log('error');
      });
    }
  };
});