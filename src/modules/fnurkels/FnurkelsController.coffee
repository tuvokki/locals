###*
FnurkController. Responsible for the controlling the fnurk.
###
app.controller "FnurkelsController", ($scope, $route, $location, LinkBagData) ->
  $scope.whatsMyName = "Fnurkelzz"
  $scope.theUrl = ""
  $scope.tags = []
  
  $scope.blet = "javascript:(function(){window.location='"
  + $location.absUrl()
  + "?urlletje='+encodeURIComponent(window.location.href);})()"
  
  $scope.linkbaglist = LinkBagData.query({}, ->
    angular.forEach $scope.linkbaglist, (linkbag) ->
      # combine the tags using Array#reduce
      # See: http://davidwalsh.name/combining-js-arrays
      $scope.tags = linkbag.tags.reduce((coll, item) ->
        coll.push item
        coll
      , $scope.tags)
      return

    # Remove the duplicates
    # Although concise, this algorithm is not particularly efficient
    # for large arrays (quadratic time).
    # See: http://stackoverflow.com/a/9229821/2245236
    $scope.tags = $scope.tags.filter((item, pos, self) ->
      self.indexOf(item) is pos
    )
    return
  )
  
  $scope.dump =
    tags: []
    urlletje: $route.current.params.urlletje
  
  ###*
  different implementation of trim in Javascript in terms of performance
  See: http://blog.stevenlevithan.com/archives/faster-trim-javascript
  ###
  _fasttrim = (str) ->
    str.replace(/^\s\s*/, "").replace /\s\s*$/, ""

  _saveUrl = ->
    # we can create an instance as well
    newLink = new LinkBagData($scope.dump)
    newLink.$save (item, putResponseHeaders) ->
      
      #item => saved user object
      $scope.linkbaglist.push item
      #putResponseHeaders => $http header getter
      return
    return
  
  $scope.saveUrl = ->
    _saveUrl()
    return

  $scope.addNewTag = (event) ->
    # coffeelint: disable=max_line_length
    if not angular.isUndefined($scope.newTag) and $scope.tags.indexOf($scope.newTag) is -1 and $scope.newTag isnt ""
    # coffeelint: enable=max_line_length

      # var myNewTag = _fasttrim($scope.newTag).toLowerCase();
      myNewTag = $scope.newTag.replace(/\s+/g, "").toLowerCase()
      $scope.tags.push myNewTag
      $scope.dump.tags.push myNewTag
      $scope.newTag = ""
    
    # _saveUrl();
    if event
      event.stopPropagation()
      event.preventDefault()
    return

  $scope.checkAllTags = ->
    $scope.dump.tags = angular.copy($scope.tags)
    return

  $scope.uncheckAllTags = ->
    $scope.dump.tags = []
    return

  return

