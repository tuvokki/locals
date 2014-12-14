/**
 * FnurkController. Responsible for the controlling the fnurk.
 */
app.controller('FnurkelsController', function($scope){
  $scope.whatsMyName = 'Fnurkels';

  $scope.theUrl = '';

  $scope.tags = [
    'javascript', 
    'tuts', 
    'testing', 
    'admin'
  ];

  $scope.dump = {
    tags: ['testing'],
    url: 'http://www.tuvok.nl/'
  };

  $scope.saveUrl = function() {
    console.log("$scope.dump", $scope.dump);
  }

  $scope.checkAllTags = function() {
    $scope.dump.tags = angular.copy($scope.tags);
  };
  $scope.uncheckAllTags = function() {
    $scope.dump.tags = [];
  };
});