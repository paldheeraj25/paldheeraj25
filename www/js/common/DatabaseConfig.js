(function(){
  'use strict';
  homeAppService.factory('DatabaseConfig', ['FURL', function(FURL){
     var config = {
      apiKey: "AIzaSyD1uypvk7nFhwGzuuDXl0aELHvdWG3L2M4",
      authDomain: "home-automation-ebe4b.firebaseapp.com",
      databaseURL: "https://home-automation-ebe4b.firebaseio.com",
      storageBucket: "home-automation-ebe4b.appspot.com",
      messagingSenderId: "874103672957"
    };
    this.dataBaseInstance = firebase.initializeApp(config);
    return {
      dataBaseInitialized: function(){
        return this.dataBaseInstance;
      }
    };
  }]);
})();