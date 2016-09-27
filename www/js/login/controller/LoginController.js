'Use Strict';
homeAppController.controller('LoginController', function($scope, $state, $ionicLoading, FURL, $firebaseArray, DatabaseConfig, Auth) {
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
  _instance.authenticateUser = function(){
    _instance.loadingShow();
    return Auth.login(_instance.user.email, _instance.user.password).then(function(user){
      _instance.loadingHide();
      if(user){
        _instance.user = {};
        $state.transitionTo('tab.home', true,{id: 'one'});
      }
    });
  };
});