/**
 * FnurkController. Responsible for the controlling the fnurk.
 */
app.controller('FnurkelsController', function($scope, $route, LinkBagData){

  $scope.linkbaglist = LinkBagData.query();

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
    urlletje: $route.current.params.urlletje
  };

  function _saveUrl() {
    console.log("in _saveUrl method", $scope.dump);
    // we can create an instance as well
    var newLink = new LinkBagData($scope.dump);
    newLink.$save(function(item, putResponseHeaders) {
      //item => saved user object
      $scope.linkbaglist.push(item);
      //putResponseHeaders => $http header getter
    });
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
    // _saveUrl();
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