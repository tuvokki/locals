###*
ZwadonkController. Responsible for the zwadonk view.
###
app.controller "ZwadonkController", ($scope, LinkBagData, LinkBagUtils) ->
  $scope.whatsMyName = "Zwadonk"
  $scope.whosTheMan = chance.string()
  $scope.linkbaglist = LinkBagData.query({}, ->
    $scope.tags = LinkBagUtils.getTags($scope.linkbaglist)
    return
  )
  $scope.toggleRightpanel = (event) ->
    $scope.showInfo = not $scope.showInfo
    if event
      event.stopPropagation()
      event.preventDefault()
    return

  return

