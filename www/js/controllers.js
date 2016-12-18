(function(){
  'use strict';
  homeAppController.controller('mainController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
    $scope.myGoBack = function(){
     $state.go('tab.home');
    };
  }]);
})();
