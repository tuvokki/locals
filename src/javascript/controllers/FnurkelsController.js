/**
 * FnurkController. Responsible for the controlling the fnurk.
 */
app.controller('FnurkelsController', function($scope, $route, LinkBagData){

  console.log("LinkBagData.getLinks()", LinkBagData.getLinks());

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
    url: $route.current.params.urlletje
  };

  function _saveUrl() {
    console.log("in _saveUrl method", $scope.dump);
  }

  $scope.saveUrl = function() {
    _saveUrl();
  };

  $scope.addNewTag = function(event) {
    if (!angular.isUndefined($scope.newTag) && $scope.tags.indexOf($scope.newTag) === -1 && $scope.newTag !== '') {
      $scope.tags.push($scope.newTag);
      $scope.dump.tags.push($scope.newTag);
      $scope.newTag = '';
    }
    _saveUrl();
    if(event){
      event.stopPropagation();
      event.preventDefault();
    }
  };

  $scope.checkAllTags = function() {
    $scope.dump.tags = angular.copy($scope.tags);
  };
  $scope.uncheckAllTags = function() {
    $scope.dump.tags = [];
  };
});