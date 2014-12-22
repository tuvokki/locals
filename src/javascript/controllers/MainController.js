/**
 * MainController. Responsible for the initial view.
 */
app.controller('MainController', function($scope, LinkBagData, LinkBagUtils){

  $scope.whatsMyName = 'Zwadonk';
  $scope.whosTheMan = chance.string();

  $scope.linkbaglist = LinkBagData.query({}, function() {
    $scope.tags = LinkBagUtils.getTags($scope.linkbaglist);
  });

  $scope.toggleRightpanel = function(event){
    $scope.showInfo = !$scope.showInfo;
    if(event){
      event.stopPropagation();
      event.preventDefault();
    }
  };
});
