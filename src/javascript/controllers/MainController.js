/**
 * MainController. Responsible for the initial view.
 */
app.controller('MainController', function($scope){
  $scope.whatsMyName = 'Zwadonk';
  $scope.whosTheMan = 'Okki';
  $scope.things = [];
  for (var i = 0; i < 100; i++) {
    $scope.things.push({code: i});
  }

  $scope.toggleRightpanel = function(event){
    $scope.showInfo = !$scope.showInfo;
    if(event){
      event.stopPropagation();
      event.preventDefault();
    }
  };
});