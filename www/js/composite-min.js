var homeAppModule=angular.module("starter",["ionic","starter.controllers","firebase","starter.services","ngMaterial","ngMessages","underscore","ion-datetime-picker"]),homeAppController=angular.module("starter.controllers",[]),homeAppService=angular.module("starter.services",[]);homeAppModule.run(["$ionicPlatform",function(a){a.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).constant("FURL","https://home-automation-ebe4b.firebaseio.com/").config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function(a,b,c){c.tabs.position("bottom"),c.navBar.alignTitle("center"),a.state("tab",{url:"/tab",abstract:!0,templateUrl:"templates/tabs.html"}).state("login",{url:"/login",templateUrl:"templates/login.html",controller:"LoginController as login",params:{id:null}}).state("tab.home",{url:"/home",views:{"tab-home":{templateUrl:"templates/tab-home.html",controller:"HomeController as home",params:{id:null},resolve:{auth:["$state","Auth",function(a,b){return b.requireAuth().uid?b.requireAuth().uid:(console.log("no user logged in"),null)}],roomList:["auth","Auth",function(a,b){return console.log(a),null===a?null:b.getUser(b.requireAuth().uid).then(function(a){return a.rooms})}]}}}}).state("tab.power",{url:"/power",views:{"tab-power":{templateUrl:"templates/tab-power.html",controller:"PowerController as power",resolve:{auth:["$state","Auth",function(a,b){return b.requireAuth().uid?b.requireAuth().uid:(console.log("no user logged in"),null)}]}}}}).state("tab.home-detail",{url:"/home/:roomId",views:{"tab-home":{templateUrl:"templates/home-detail.html",controller:"HomeDetailController as homeDetail",resolve:{auth:["$state","Auth",function(a,b){return b.requireAuth().uid?b.requireAuth().uid:(console.log("no user logged in"),null)}],roomId:["$stateParams","$state","Auth",function(a,b,c){return angular.isUndefined(c.requireAuth.uid)?null:a.roomId}],roomDetail:["$stateParams","auth","Auth","HomeDetailService",function(a,b,c,d){return null===b?null:d.getRoomDetail(c.requireAuth().uid,a.roomId).then(function(a){return a})}]}}}}).state("tab.account",{url:"/account",views:{"tab-account":{templateUrl:"templates/tab-account.html",controller:"AccountController as AccountCtrl",resolve:{auth:["$state","Auth",function(a,b){return b.requireAuth().uid?b.requireAuth().uid:(console.log("no user logged in"),null)}]}}}}),b.otherwise("/login")}]),function(){"use strict";homeAppService.factory("DatabaseConfig",["FURL",function(a){var b={apiKey:"AIzaSyD1uypvk7nFhwGzuuDXl0aELHvdWG3L2M4",authDomain:"home-automation-ebe4b.firebaseapp.com",databaseURL:"https://home-automation-ebe4b.firebaseio.com",storageBucket:"home-automation-ebe4b.appspot.com",messagingSenderId:"874103672957"};return this.dataBaseInstance=firebase.initializeApp(b),{dataBaseInitialized:function(){return this.dataBaseInstance}}}])}(),function(){"use strict";homeAppController.controller("mainController",["$scope","$state","$stateParams",function(a,b,c){a.myGoBack=function(){b.go("tab.home")}}])}(),function(){"use strict";homeAppController.controller("HomeDetailController",["$http","$state","$stateParams","$rootScope","$scope","$ionicModal","auth","roomId","roomDetail","HomeDetailService",function(a,b,c,d,e,f,g,h,i,j){var k=this;k.userId=g,k.roomId=h,null===g&&b.go("login"),d.onDevices=[],k.roomDetail=i,k.devices=[],k.getAllDevice=angular.copy(k.roomDetail.gpio),f.fromTemplateUrl("my-modal.html",{scope:e,animation:"slide-in-up"}).then(function(a){e.modal=a}),e.setOnTimer=function(a,b,c){console.log(a+" "+b+" "+c)},e.setOffTimer=function(a,b,c){console.log(a+" "+b+" "+c)},console.log(k.roomDetail),console.log(k.userId),_.each(k.roomDetail.gpio,function(a){k.devices[a.value]=Boolean(a.status)}),k.addTimer=function(a,b,d){e.modalDeviceValue=a,e.modalDeviceName=b,e.modalDeviceDataValue=d,e.roomId=c.roomId,e.modal.show()},k.allDeviceToggle=function(b){console.log(b),console.log(k.getAllDevice);var d=b===!0?1:0,e=k.getAllDevice;console.log(e),_.each(e,function(e){a.jsonp("https://"+i.domain+"/gpio2.php?device="+e.localUrl+"&state="+e.gpioPin+d+"&callback=JSON_CALLBACK").success(function(a){console.log(b+" is "+b),j.setStatusOn(k.userId,c.roomId,"cfl")}).error(function(a){console.log("failure")})})},k.toggleSwitch=function(b,d){console.log(b),console.log(d);var e=b===!0?1:0;a.jsonp("https://"+i.domain+"/gpio2.php?device="+d.localUrl+"&state="+d.gpioPin+e+"&callback=JSON_CALLBACK").success(function(a){console.log("success"),j.setStatusOn(k.userId,c.roomId,"cfl")}).error(function(a){console.log("error")})}}])}(),function(){"use strict";homeAppService.factory("HomeDetailService",["DatabaseConfig",function(a){a.dataBaseInitialized();var b=firebase.database().ref();return{getRoomDetail:function(a,c){return b.child("room").child(a).child(c).once("value").then(function(a){return a.val()})},getDomain:function(a,c){return b.child("room").child(a).child(c).once("value").then(function(a){return a.val()})},setStatusOn:function(a,c,d){return b.child("room").child(a).child(c).child("gpio").child(d).update({status:1}).then(function(a){console.log("switch on")})},setStatusOff:function(a,c,d){return b.child("room").child(a).child(c).child("gpio").child(d).update({status:0}).then(function(a){console.log("switch off")})}}}])}(),function(){"use strict";homeAppController.controller("HomeController",["$scope","$state","auth","HomeService","roomList",function(a,b,c,d,e){null===c&&b.go("login");var f=this;a.chats=e,f.goToRoom=function(a){b.go("tab.home-detail",{roomId:a.id})}}])}(),function(){"use strict";homeAppController.controller("AccountController",["$scope","$rootScope","$state","$ionicLoading","auth","Auth","DatabaseConfig",function(a,b,c,d,e,f,g){null===e&&c.go("login");var h=this;g.dataBaseInitialized(),h.settings={enableFriends:!0},h.loadingShow=function(){d.show({template:'<ion-spinner icon="spiral"></ion-spinner>'}).then(function(){})},h.loadingHide=function(){d.hide().then(function(){})},h.logout=function(){return h.loadingShow(),h.loadingHide(),f.logout()}}])}(),function(){"use strict";homeAppService.factory("HomeService",["DatabaseConfig",function(a){a.dataBaseInitialized();var b=[{id:0,name:"Hall",lastText:"",face:"img/home.jpg"},{id:1,name:"Kitchen",lastText:"",face:"img/home.jpg"},{id:2,name:"Bedroom 1",lastText:"",face:"img/home.jpg"},{id:3,name:"Bedroom 2",lastText:"",face:"img/home.jpg"},{id:4,name:"Balcony",lastText:"",face:"img/home.jpg"}];return{all:function(){return b},remove:function(a){b.splice(b.indexOf(a),1)},get:function(a){for(var c=0;c<b.length;c++)if(b[c].id===parseInt(a))return b[c];return null}}}])}(),function(){"use strict";homeAppController.controller("LoginController",["$scope","$state","$ionicLoading","$ionicPopup","$firebaseArray","DatabaseConfig","Auth",function(a,b,c,d,e,f,g){var h=this;f.dataBaseInitialized(),h.loadingShow=function(){c.show({template:'<ion-spinner icon="spiral"></ion-spinner>'}).then(function(){})},h.loadingHide=function(){c.hide().then(function(){})},h.showConfirm=function(a){var b=d.confirm({title:"Login Error",template:a});b.then(function(a){return!1})},h.authenticateUser=function(){h.loadingShow(),g.login(h.user.email,h.user.password).then(function(a){h.loadingHide(),h.loginErrorMessage=!1,console.log(a),a&&(h.user={},b.transitionTo("tab.home",!0,{id:"one"}))},function(a){h.loadingHide(),console.log(a),h.loginErrorMessage=!0})}}])}(),function(){"use strict";homeAppService.factory("Auth",["$firebaseAuth","FURL","$firebaseObject","$firebaseArray","$state","$http","DatabaseConfig",function(a,b,c,d,e,f,g){var h=this;g.dataBaseInitialized();var i=firebase.database().ref().child("user");h.authUser={};var j={getUser:function(a){return i.child(a).once("value").then(function(a){return a.val()})},login:function(a,b){return firebase.auth().signInWithEmailAndPassword(a,b).then(function(a){return a?(h.authUser=firebase.auth().currentUser,j.getUser(a.uid)):(console.log("User authentication failed moving to login page"),void e.go("login"))})},requireAuth:function(){return h.authUser},logout:function(){firebase.auth().signOut().then(function(){console.log("User is successfully logout via Auth service and auth user test"),h.authUser=void 0,e.go("login")},function(a){console.log("there is an error while logging out")})}};return j}])}(),function(){"use strict";homeAppController.controller("PowerController",["$scope","$state","$rootScope","$http","auth",function(a,b,c,d,e){null===e&&b.go("login");var f=this;f.powerOffAll=function(a){console.log(a),console.log(c.onDevices),_.each(c.onDevices,function(a){"CFL"===a.deviceName?d.jsonp("https://"+a.deviceDomain+"/gpio2.php?"+a.deviceUrlParam+"=&callback=JSON_CALLBACK").success(function(a){console.log("success"),console.log(a)}).error(function(a){console.log("error")}):"Tube Light"===a.deviceName&&d.jsonp("https://"+a.deviceDomain+"/gpio2.php?"+a.deviceUrlParam+"=&callback=JSON_CALLBACK").success(function(a){console.log("success"),console.log(a)}).error(function(a){console.log("error")})}),console.log("power off all")},f.powerOnAll=function(a){console.log(a),console.log("power on all")}}])}();
//# sourceMappingURL=sourceMap.map