'use strict';
homeAppController.controller('HomeDetailController', function($http, $state, auth, roomId, roomDetail) {
  var _instance = this;
  _instance.roomId = roomId;
  if(auth === null){
    $state.go('login');
  }
  _instance.roomDetail = roomDetail;
  _instance.toggleSwitch = function(deviceValue, deviceName){
    if(deviceName === 'CFL' && deviceValue === true){
      $http.jsonp('https://myxwzzgg.p71.weaved.com/gpio2.php?off=OFF&callback=JSON_CALLBACK').success(function(data){
        console.log('success');
        console.log(data);
	    })
	    .error(function () {
	      console.log('error')
	    });
    } else if(deviceName === 'CFL' && deviceValue === false){
      $http.jsonp('https://myxwzzgg.p71.weaved.com/gpio2.php?on=ON&callback=JSON_CALLBACK').success(function(data){
       console.log('success');
	    })
	    .error(function () {
	      console.log('error')
	    });
    }
  };
});