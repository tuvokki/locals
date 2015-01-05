###*
ZwadonkController. Responsible for the zwadonk view.
This is supposed to be dispatched work from the ModulesController
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
    console.log 'Open info panel'
    if event
      # load contents of the panel
      # donno why but I donnu what do actually _do_ here
      event.stopPropagation()
      event.preventDefault()
    return

  return

