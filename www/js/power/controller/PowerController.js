(function(){
  'use strict';
  homeAppController.controller('PowerController', ['$scope', '$state', '$rootScope', '$http', 'auth', function($scope, $state, $rootScope, $http, auth) {
  if(auth === null){
    $state.go('login');
  }
  var _instance = this;
  _instance.powerOffAll = function(switchOffAll){
    console.log(switchOffAll);
    console.log($rootScope.onDevices);
    _.each($rootScope.onDevices, function(device){
      if(device.deviceName === 'CFL'){
        $http.jsonp('https://'+ device.deviceDomain + '/gpio2.php?'+device.deviceUrlParam+'=&callback=JSON_CALLBACK').success(function(data){
          console.log('success');
          console.log(data);
        })
        .error(function (error) {
          console.log('error');
        });
      } else if(device.deviceName === 'Tube Light'){
        $http.jsonp('https://'+ device.deviceDomain + '/gpio2.php?'+device.deviceUrlParam+'=&callback=JSON_CALLBACK').success(function(data){
          console.log('success');
          console.log(data);
        })
        .error(function (error) {
          console.log('error');
        });
      }


    });
    console.log('power off all');
    };
    _instance.powerOnAll = function(switchOnAll){
      console.log(switchOnAll);
      console.log('power on all');
    };
  }]);
})();