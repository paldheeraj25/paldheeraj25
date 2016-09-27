homeAppController.controller('mainController', function($scope, $state, $stateParams) {
  $scope.myGoBack = function(){
   $state.go('tab.home');
  };
});
