'Use Strict';
homeAppService.factory('Auth', function($firebaseAuth, FURL, $firebaseObject, $firebaseArray, $state, $http, DatabaseConfig){
  _instance = this;
   DatabaseConfig.dataBaseInitialized();
   var ref = firebase.database().ref().child('user');
   _instance.authUser = {};
   var Auth = {
     getUser: function(id){
       return ref.child(id).once('value').then(function(snapshot) {
        return snapshot.val();
      });
     },
     login: function(email, password){
       return firebase.auth().signInWithEmailAndPassword(email, password).then(function(auth) {
         // Handle Errors here.
         if(auth){
            _instance.authUser = firebase.auth().currentUser;
           return Auth.getUser(auth.uid);
         }else{
          console.log('User authentication failed moving to login page');
          $state.go('login');
         }
       });
     },
     requireAuth: function(){
      return _instance.authUser;
     },
     logout: function(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('User is successfully logout via Auth service and auth user test');
        _instance.authUser = undefined;
        $state.go('login');
      }, function(error) {
        // An error happened.
        console.log('there is an error while logging out');
      });
     }
   };
   return Auth;
});