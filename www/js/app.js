// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var homeAppModule = angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'starter.services', 'ngMaterial', 'ngMessages', 'underscore', "ion-datetime-picker"]);
var homeAppController = angular.module('starter.controllers', []);
var homeAppService = angular.module('starter.services', []);
homeAppModule.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.constant('FURL', 'https://home-automation-ebe4b.firebaseio.com/')

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  //default tab moved to bottom all platform
  $ionicConfigProvider.tabs.position('bottom');
   $ionicConfigProvider.navBar.alignTitle('center');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController as login',
    params: {
      id: null
    }
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeController as home',
        params:{id: null},
        resolve: {
          auth: function($state, Auth){
            if(!Auth.requireAuth().uid){
              console.log('no user logged in');
              return null;
            }else{
              return Auth.requireAuth().uid;
            }
          },
          roomList: function(auth, Auth){
            console.log(auth);
            if(auth === null){
              return null;
            } else {
              return  Auth.getUser(Auth.requireAuth().uid).then(function(data){
                  return data.rooms;
              });
            }
          }
        }
      }
    }
  })

  .state('tab.power', {
      url: '/power',
      views: {
        'tab-power': {
          templateUrl: 'templates/tab-power.html',
          controller: 'PowerController as power',
          resolve: {
            auth: function($state, Auth){
              if(!Auth.requireAuth().uid){
                console.log('no user logged in');
                return null;
              }else{
                return Auth.requireAuth().uid;
              }
            }
          }
        }
      }
    })
    .state('tab.home-detail', {
      url: '/home/:roomId',
      views: {
        'tab-home': {
          templateUrl: 'templates/home-detail.html',
          controller: 'HomeDetailController as homeDetail',
          resolve: {
            auth: function($state, Auth){
              if(!Auth.requireAuth().uid){
                console.log('no user logged in');
                return null;
              } else{
                return Auth.requireAuth().uid;
              }
            },
            roomId: function($stateParams, $state, Auth){
              if(angular.isUndefined(Auth.requireAuth.uid)){
                return null;
              } else {
                return $stateParams.roomId;
              }
            },
            roomDetail: function($stateParams, auth, Auth, HomeDetailService){
              if(auth === null){
                return null;
              } else{
                return HomeDetailService.getRoomDetail(Auth.requireAuth().uid, $stateParams.roomId).then(function(data){
                  return data;
                });
              }
            }
          }
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountController as AccountCtrl',
        resolve: {
          auth: function($state, Auth){
            if(!Auth.requireAuth().uid){
              console.log('no user logged in');
              return null;
            } else{
              return Auth.requireAuth().uid;
            }
          }
        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
