'use strict';
homeAppController.controller('AccountController', function($scope, $rootScope, $state, auth, Auth, DatabaseConfig) {
  if (auth === null) {
    $state.go('login');
  }
  var _instance = this;
  DatabaseConfig.dataBaseInitialized();
  _instance.settings = {
    enableFriends: true
  };
  _instance.logout = function(){
    return Auth.logout();
  };
});