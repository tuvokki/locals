/**
 * FnurkController. Responsible for the controlling the fnurk.
 */
app.controller('FnurkelsController', function($scope, $route, $location, LinkBagData){

  $scope.whatsMyName = 'Fnurkels';

  $scope.theUrl = '';

  $scope.tags = [
  ];

  // set the "scripturl" option to supress the JSLint 'Script URL' warning 
  /*jshint scripturl:true*/
  $scope.blet = "javascript:(function(){window.location='" + $location.absUrl() + "?urlletje='+encodeURIComponent(window.location.href);})()";

  $scope.linkbaglist = LinkBagData.query({}, function() {
    angular.forEach($scope.linkbaglist, function(linkbag) {
      // combine the tags using Array#reduce
      // See: http://davidwalsh.name/combining-js-arrays
      $scope.tags = linkbag.tags.reduce( function(coll,item){
          coll.push( item );
          return coll;
      }, $scope.tags );
    });

    // Remove the duplicates
    // Although concise, this algorithm is not particularly efficient for large arrays (quadratic time).
    // See: http://stackoverflow.com/a/9229821/2245236
    $scope.tags = $scope.tags.filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    });
  });

  $scope.dump = {
    tags: [],
    urlletje: $route.current.params.urlletje
  };

  /**
   * different implementation of trim in Javascript in terms of performance
   * See: http://blog.stevenlevithan.com/archives/faster-trim-javascript
   */
  function _fasttrim (str) {
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  function _saveUrl() {
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
      // var myNewTag = _fasttrim($scope.newTag).toLowerCase();
      var myNewTag = $scope.newTag.replace(/\s+/g, '').toLowerCase();
      $scope.tags.push(myNewTag);
      $scope.dump.tags.push(myNewTag);
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