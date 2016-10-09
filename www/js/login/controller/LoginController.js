'Use Strict';
homeAppController.controller('LoginController', function($scope, $state, $ionicLoading, $ionicPopup, $firebaseArray, DatabaseConfig, Auth) {
  _instance = this;
  // database initialisation service
  DatabaseConfig.dataBaseInitialized();
  // firebase.auth().createUserWithEmailAndPassword('admin@admin.com', 'admin@admin').catch(function(error) {
  // // Handle Errors here
  //   console.log('there is this error da');
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.log(error);
  // // ...
  // });
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

  _instance.showConfirm = function(message) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Login Error',
      template: message
    });
    confirmPopup.then(function(res) {
      return false;
    });
  };
  _instance.authenticateUser = function(){
    _instance.loadingShow();
    Auth.login(_instance.user.email, _instance.user.password).then(function(result) {
      _instance.loadingHide();
      _instance.loginErrorMessage = false;
      console.log(result);
      if(result){
        _instance.user = {};
        $state.transitionTo('tab.home', true,{id: 'one'});
      }
    }, function(error) {
      _instance.loadingHide();
      console.log(error);
      // you can fetch the providers using this:
      _instance.loginErrorMessage = true;
      //_instance.showConfirm(error.code);
    });
  };
});