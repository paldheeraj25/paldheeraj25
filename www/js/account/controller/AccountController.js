'use strict';
homeAppController.controller('AccountController', function($scope, $rootScope, $state, FURL, $firebaseAuth, $firebaseObject, $firebaseArray, DatabaseConfig, Auth) {
  var _instance = this;
  DatabaseConfig.dataBaseInitialized();
  _instance.settings = {
    enableFriends: true
  };
  _instance.logout = function(){
    return Auth.logout();
  };
});