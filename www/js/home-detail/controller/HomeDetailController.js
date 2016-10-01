'use strict';
homeAppController.controller('HomeDetailController', function($http, roomId, roomDetail) {
  var _instance = this;
  _instance.roomId = roomId;
  console.log(roomDetail);
  _instance.roomDetail = roomDetail;
  _instance.toggleSwitch = function(deviceValue, deviceName){
    if(deviceName === 'CFL' && deviceValue === true){
      //$http.jsonp('http://192.168.1.4/gpio.php?off=OFF');
      $http.jsonp('http://192.168.1.3/gpio2.php?off=OFF?&callback=JSON_CALLBACK').success(function(data){
        console.log('success');
        console.log(data);
	    })
	    .error(function () {
	      console.log('error')
	    });
    } else if(deviceName === 'CFL' && deviceValue === false){
      //$http.jsonp('http://192.168.1.4/gpio.php?off=ON');
      $http.jsonp('http://192.168.1.3/gpio2.php?on=ON?&callback=JSON_CALLBACK').success(function(data){
       console.log('success');
	    })
	    .error(function () {
	      console.log('error')
	    });
    }
  };
});