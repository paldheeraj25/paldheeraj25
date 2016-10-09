'use strict';
homeAppController.controller('AccountController', function($scope, $rootScope, $state, $ionicLoading, auth, Auth, DatabaseConfig) {
  if (auth === null) {
    $state.go('login');
  }
  var _instance = this;
  DatabaseConfig.dataBaseInitialized();
  _instance.settings = {
    enableFriends: true
  };

  _instance.loadingShow = function(){
    $ionicLoading.show({
      template: '<ion-spinner icon="spiral"></ion-spinner>'
    }).then(function(){
    });
  };

  _instance.loadingHide = function(){
    $ionicLoading.hide().then(function(){
    });
  };

  _instance.logout = function(){
    _instance.loadingShow();
    _instance.loadingHide();
    return Auth.logout();
  };
});