'use strict';
homeAppController.controller('HomeDetailController', function($http, $state, $stateParams, auth, roomId, roomDetail, HomeDetailService ) {
  var _instance = this;
  _instance.userId = auth;
  _instance.roomId = roomId;
  if(auth === null){
    $state.go('login');
  }
  _instance.roomDetail = roomDetail;
  console.log(_instance.roomDetail);
  console.log(_instance.userId);
  _instance.toggleSwitch = function(deviceValue, deviceName){
    HomeDetailService.getDomain(auth, $stateParams.roomId).then(function(data){
      console.log(data.domain);
      if(deviceName === 'CFL' && deviceValue === true){
      $http.jsonp('https://'+ data.domain + '/gpio2.php?cflon=OFF&callback=JSON_CALLBACK').success(function(data){
        console.log('success');
        console.log(data);
      })
      .error(function () {
        console.log('error');
      });
    } else if(deviceName === 'CFL' && deviceValue === false){
      $http.jsonp('https://'+ data.domain + '/gpio2.php?cfloff=ON&callback=JSON_CALLBACK').success(function(data){
       console.log('success');
      })
      .error(function () {
        console.log('error');
      });
    } else if(deviceName === 'Tube Light' && deviceValue === true){
      $http.jsonp('https://'+ data.domain + '/gpio2.php?tubelighton=ON&callback=JSON_CALLBACK').success(function(data){
       console.log('success');
      })
      .error(function () {
        console.log('error');
      });
    } else if(deviceName === 'Tube Light' && deviceValue === false){
      $http.jsonp('https://'+ data.domain + '/gpio2.php?tubelightoff=ON&callback=JSON_CALLBACK').success(function(data){
       console.log('success');
      })
      .error(function () {
        console.log('error');
      });
    }
    });
    //console.log(deviceName);
    //console.log(deviceValue);
    //console.log('https://'+ _instance.roomDetail.domain + '/gpio2.php?cflon=OFF&callback=JSON_CALLBACK');
  };
});