'Use Strict';
homeAppController.controller('HomeController', function($scope, $state, auth, HomeService, roomList) {
  if(auth === null){
    $state.go('login');
  }
  var _instance = this;
  $scope.chats = roomList;

  _instance.goToRoom = function(room){
    $state.go('tab.home-detail', {roomId: room.id});
  };
});