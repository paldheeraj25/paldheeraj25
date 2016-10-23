'Use Strict';
homeAppController.controller('PowerController', function($scope, $state, auth) {
  if(auth === null){
    $state.go('login');
  }
  var _instance = this;
  _instance.powerOffAll = function(switchOffAll){
    console.log(switchOffAll);
    console.log('power off all');
  };
  _instance.powerOnAll = function(switchOnAll){
    console.log(switchOnAll);
    console.log('power on all');
  };
});