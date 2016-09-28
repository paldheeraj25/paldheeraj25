// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var homeAppModule = angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'starter.services', 'ngMaterial', 'ngMessages']);
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
            if(!Auth.requireAuth()){
              console.log('no user logged in');
              $state.go('login');
            }
          },
          roomList: function(Auth){
            return Auth.getUser(Auth.requireAuth().uid).then(function(data){
              return data.rooms;
            });
          }
        }
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl',
          resolve: {
            auth: function($state, Auth){
              if(!Auth.requireAuth()){
                console.log('no user logged in');
                $state.go('login');
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
              if(!Auth.requireAuth()){
                console.log('no user logged in');
                $state.go('login');
              }
              return Auth.requireAuth().uid;
            },
            roomId: function($stateParams){
              return $stateParams.roomId;
            },
            roomDetail: function($stateParams, Auth, HomeDetailService){
              return HomeDetailService.getRoomDetail(Auth.requireAuth().uid, $stateParams.roomId).then(function(data){
                return data;
              });
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
            if(!Auth.requireAuth()){
              console.log('no user logged in');
              $state.go('login');
            }
          }
        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
